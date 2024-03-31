package com.seafood.back.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.service.PaymentService;
import com.seafood.back.service.ProductService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/verifyIamport")
public class PaymentController {

    private final IamportClient iamportClient;
    private final PaymentService paymentService;
    private final ProductService productService;

    public PaymentController(@Value("${iamport.key}") String restApiKey, @Value("${iamport.secret}") String restApiSecret, PaymentService paymentService, ProductService productService) {
        this.iamportClient = new IamportClient(restApiKey, restApiSecret);
        this.paymentService = paymentService;
        this.productService = productService;
    }

    @PostMapping("/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(@PathVariable String imp_uid, @RequestBody List<CartDTO> orderItems) throws IamportResponseException, IOException{
        
        BigDecimal orderAmount = paymentService.orderAmount(orderItems);
        
        // 결제 금액과 주문 가격 비교
        IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(imp_uid);
        BigDecimal paidAmount = iamportResponse.getResponse().getAmount(); // 결제된 금액

        log.info("paidAmount" + paidAmount.toString());
        log.info("orderAmount" + orderAmount.toString());
        if (orderAmount.compareTo(paidAmount) == 0) {
            log.info("결제 성공");

            // 결제가 성공하면 상품 수량 변경
            productService.updateProductQuantities(orderItems);

            return iamportResponse;
        } else {
            log.error("결제 검증 실패: 주문 가격과 결제된 금액이 일치하지 않습니다.");
            // 예외 처리 또는 오류 응답 반환
            throw new RuntimeException("결제 검증 실패: 주문 가격과 결제된 금액이 일치하지 않습니다.");
        }
    }
}
