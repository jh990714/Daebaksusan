package com.seafood.back.service.imple;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.entity.PaymentDetailsEntity;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.respository.PaymentDetailsRepository;
import com.seafood.back.service.InfoService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class InfoServiceImple implements InfoService {

    private final MemberRepository memberRepository;
    private final PaymentDetailsRepository paymentDetailsRepository;
    private final ObjectMapper objectMapper; // JSON 변환을 위한 ObjectMapper
    private final IamportClient iamportClient;

    private final PasswordEncoder passwordEncoder;

    @Override
    public String getUserInfo(String id) {
        MemberEntity member = memberRepository.findById(id);

        if (member != null) {
            try {
                return objectMapper.writeValueAsString(member);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "Failed to retrieve user info"; // JSON 변환 실패 시 예외 처리
            }
        } else {
            return "User not found"; // 사용자가 없을 경우 예외 처리
        }
    }

    @Override
    public Page<PaymentDetailDTO> getOrdertDetails(String id, int page, int size) {
        // 페이지 번호를 0부터 시작하도록 수정
        Pageable pageable = PageRequest.of(page - 1, size);

        // 페이지네이션된 데이터를 가져옴
        Page<PaymentDetailsEntity> paymentDetailsPage = paymentDetailsRepository
                .findByMemberIdOrderByPaymentDetailIdDesc(id, pageable);

        // PaymentDetailDTO 리스트를 담을 리스트 생성
        List<PaymentDetailDTO> paymentDetailDTOs = new ArrayList<>();

        // 페이지네이션된 데이터를 PaymentDetailDTO로 변환하여 리스트에 추가
        for (PaymentDetailsEntity paymentDetail : paymentDetailsPage.getContent()) {
            try {
                PaymentDetailDTO paymentDetailDTO = new PaymentDetailDTO();

                IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(paymentDetail.getImpUid());

                List<CartDTO> orderItems = extractOrderItems(iamportResponse);

                paymentDetailDTO.setOrderNumber(paymentDetail.getOrderNumber());
                paymentDetailDTO.setOrderItems(orderItems);
                if (iamportResponse.getResponse().getStatus().equals("cancelled")) {
                    paymentDetailDTO.setCancel(true);
                }
                
                paymentDetailDTOs.add(paymentDetailDTO);
            } catch (IamportResponseException | IOException e) {
                // 예외 발생 시 처리
                e.printStackTrace();
            }
        }

        return new PageImpl<>(paymentDetailDTOs, pageable, paymentDetailsPage.getTotalElements());
    }

    @Override
    public List<PaymentDetailDTO> getPaymentByOrderNumberAndPassword(String orderNumber, String password) {
        PaymentDetailsEntity paymentDetail = paymentDetailsRepository.findByOrderNumber(orderNumber);
        
        if (paymentDetail == null || paymentDetail.getMemberId() != null || !passwordEncoder.matches(password, paymentDetail.getPassword())) {
            throw new RuntimeException("주문 정보를 찾을 수 없습니다.");
        }

        List<PaymentDetailDTO> paymentDetailDTOs = new ArrayList<>();

        try {
            PaymentDetailDTO paymentDetailDTO = new PaymentDetailDTO();

            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(paymentDetail.getImpUid());

            List<CartDTO> orderItems = extractOrderItems(iamportResponse);

            paymentDetailDTO.setOrderNumber(paymentDetail.getOrderNumber());
            paymentDetailDTO.setOrderItems(orderItems);
            if (iamportResponse.getResponse().getStatus().equals("cancelled")) {
                paymentDetailDTO.setCancel(true);
            }

            paymentDetailDTOs.add(paymentDetailDTO);

            return paymentDetailDTOs;
        } catch (IamportResponseException | IOException e) {
            // 예외 발생 시 처리
            e.printStackTrace();
        }
        return null;

        
    }

    
    private List<CartDTO> extractOrderItems(IamportResponse<Payment> iamportResponse) throws IamportResponseException, IOException {
            
        // JSON 문자열 파싱하여 Map 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = objectMapper.readValue(iamportResponse.getResponse().getCustomData(),
                new TypeReference<Map<String, Object>>() {
                });

        List<CartDTO> orderItems = objectMapper.convertValue(jsonMap.get("orderItems"),
                new TypeReference<List<CartDTO>>() {
                });

        return orderItems;
    }

}