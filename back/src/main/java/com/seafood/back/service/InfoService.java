package com.seafood.back.service;

import java.util.List;


import com.seafood.back.dto.PaymentDetailDTO;

public interface InfoService {
    String getUserInfo(String id);

    List<PaymentDetailDTO> getPaymentDetails(String id);
}
