package com.seafood.back.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.CouponDTO;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

public interface PaymentService {
    public BigDecimal orderAmount(String imp_uid, List<CartDTO> orderItems);
    public String savePaymentDetails(String id, String imp_uid, String password);
    public String processSuccessfulPayment(String id, List<CartDTO> orderItems, String impUid, String password, CouponDTO couponId, BigDecimal points);
    public ResponseEntity<?> refundIamport(String id, String oderNumber);
    public Map<String, Object> verifyAndProcessPayment(String imp_uid) throws Exception;
    public IamportResponse<Payment> cancelPayment(String imp_uid);
    public ResponseEntity<?> getPaymentAndOrderInfo(String orderNumber);
}
