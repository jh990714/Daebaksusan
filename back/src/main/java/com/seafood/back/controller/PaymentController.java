package com.seafood.back.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.service.PaymentService;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final IamportClient iamportClient;
    private final PaymentService paymentService;

    public PaymentController(@Value("${iamport.key}") String restApiKey,
            @Value("${iamport.secret}") String restApiSecret, PaymentService paymentService) {
        this.iamportClient = new IamportClient(restApiKey, restApiSecret);
        this.paymentService = paymentService;
        
    }

    @PostMapping("/verifyIamport/{imp_uid}")
    public ResponseEntity<?> paymentByImpUid(@PathVariable String imp_uid) {
        try {
            
            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(imp_uid);
            
            // JSON 문자열 파싱하여 Map 객체로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> jsonMap = objectMapper.readValue(iamportResponse.getResponse().getCustomData(), new TypeReference<Map<String, Object>>() {});
            
            String id = (String) jsonMap.get("id");
            List<CartDTO> orderItems = objectMapper.convertValue(jsonMap.get("orderItems"), new TypeReference<List<CartDTO>>() {});

            // 결제 금액과 주문 가격 비교
            BigDecimal paidAmount = iamportResponse.getResponse().getAmount(); // 결제된 금액
            BigDecimal orderAmount = paymentService.orderAmount(orderItems);
            
            
            if (orderAmount.compareTo(paidAmount) == 0) {
                log.info("결제 성공");

                String orderNumber = paymentService.processSuccessfulPayment(id, orderItems, imp_uid);
               // 필요한 정보만을 응답으로 보내기
                Map<String, Object> response = new HashMap<>();
                response.put("orderNumber", orderNumber);
                response.put("iamportResponse", iamportResponse);

                
                return ResponseEntity.ok(response);
            } else {
                log.error("결제 검증 실패: 주문 가격과 결제된 금액이 일치하지 않습니다.");
                cancelPayment(imp_uid);
                // 예외 처리 또는 오류 응답 반환
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("주문 가격과 결제된 금액이 일치하지 않습니다.");
            }
        } catch (IllegalArgumentException e) {
            log.error("주문 수량이 재고를 초과했습니다.", e);
            cancelPayment(imp_uid);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("주문 수량이 재고를 초과했습니다.");
        } catch (Exception e) {
            log.error("오류 발생: " + e.getMessage(), e);
            // cancelPayment(imp_uid);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/refundIamport/{imp_uid}")
    public ResponseEntity<?> cancelPayment(@PathVariable String imp_uid) {
        try {
            // 결제 취소 요청 보내기
            log.info(imp_uid);
            CancelData cancelData = new CancelData(imp_uid, true);

            IamportResponse<Payment> cancelResponse = iamportClient.cancelPaymentByImpUid(cancelData);

            // 결제 취소가 성공적으로 이루어졌을 경우
            if (cancelResponse.getResponse().getStatus().equals("cancelled")) {
                log.info("결제 취소 성공");

                // 취소 성공 메시지 응답
                return ResponseEntity.ok("결제가 취소되었습니다.");
            } else {
                log.error("결제 취소 실패: " + cancelResponse.getResponse().getFailReason());

                // 취소 실패 메시지 응답
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 취소 실패: " + cancelResponse.getResponse().getFailReason());
            }
        } catch (IamportResponseException | IOException e) {
            log.error("결제 취소 중 오류 발생: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 취소 중 오류가 발생했습니다.");
        }
    }

}