package com.seafood.back.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.seafood.back.dto.PaymentDetailDTO;

public interface InfoService {
    String getUserInfo(String id);

    Page<PaymentDetailDTO> getOrdertDetails(String id, int page, int size);
}
