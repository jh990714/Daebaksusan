package com.seafood.back.service.imple;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

@Service
@RequiredArgsConstructor
public class InfoServiceImple implements InfoService {

    private final MemberRepository memberRepository;
    private final PaymentDetailsRepository paymentDetailsRepository;
    private final ObjectMapper objectMapper; // JSON 변환을 위한 ObjectMapper
    private final IamportClient iamportClient;

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
    public List<PaymentDetailDTO> getPaymentDetails(String id) {
        List<PaymentDetailsEntity> paymentDetails = paymentDetailsRepository.findByMemberIdOrderByPaymentDetailIdDesc(id);
        List<PaymentDetailDTO> result = new ArrayList<>();

        for (PaymentDetailsEntity paymentDetail : paymentDetails) {
            try {
                PaymentDetailDTO paymentDetailDTO = new PaymentDetailDTO();
                List<CartDTO> orderItems = extractOrderItems(paymentDetail);

                paymentDetailDTO.setOrderNumber(paymentDetail.getOrderNumber());
                paymentDetailDTO.setOrderItems(orderItems);

                result.add(paymentDetailDTO);
            } catch (IamportResponseException | IOException e) {
                // 예외 발생 시 처리
                e.printStackTrace();
            }
        }

        return result;
    }
    
    private List<CartDTO> extractOrderItems(PaymentDetailsEntity paymentDetail) throws IamportResponseException, IOException {
        IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(paymentDetail.getImpUid());
            
        // JSON 문자열 파싱하여 Map 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = objectMapper.readValue(iamportResponse.getResponse().getCustomData(), new TypeReference<Map<String, Object>>() {});
            
        List<CartDTO> orderItems = objectMapper.convertValue(jsonMap.get("orderItems"), new TypeReference<List<CartDTO>>() {});
        return orderItems;
    }

}