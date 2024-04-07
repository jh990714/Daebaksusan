package com.seafood.back.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.PaymentAndOrderInfo;
import com.siot.IamportRestClient.exception.IamportResponseException;

public interface PaymentService {
    public BigDecimal orderAmount(String imp_uid, List<CartDTO> orderItems);
    public String savePaymentDetails(String id, String imp_uid);
    public String processSuccessfulPayment(String id, List<CartDTO> orderItems, String impUid);
    public ResponseEntity<?> refundIamport(String id, String oderNumber);
    public Map<String, Object> verifyAndProcessPayment(String imp_uid) throws Exception;
    public ResponseEntity<?> cancelPayment(String imp_uid);
    public ResponseEntity<?> getPaymentAndOrderInfo(String id, String orderNumber);
}
