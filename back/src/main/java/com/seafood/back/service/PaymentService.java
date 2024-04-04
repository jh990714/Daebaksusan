package com.seafood.back.service;

import java.math.BigDecimal;
import java.util.List;

import com.seafood.back.dto.CartDTO;

public interface PaymentService {
    public BigDecimal orderAmount(List<CartDTO> orderItems);
    public String savePaymentDetails(String id, String imp_uid);
    String processSuccessfulPayment(String id, List<CartDTO> orderItems, String impUid);
}
