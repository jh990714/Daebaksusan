package com.seafood.back.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.entity.MemberEntity;

public interface InfoService {
    MemberEntity getUserInfo(String id);

    Page<PaymentDetailDTO> getOrdertDetails(String id, int page, int size);
    List<PaymentDetailDTO> getPaymentByOrderNumberAndPassword(String orderNumber, String password);
}
