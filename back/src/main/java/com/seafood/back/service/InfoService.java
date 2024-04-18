package com.seafood.back.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.dto.ReviewDTO;
import com.seafood.back.dto.ReviewRequestDTO;

public interface InfoService {
    String getUserInfo(String id);

    Page<PaymentDetailDTO> getOrdertDetails(String id, int page, int size);
    List<PaymentDetailDTO> getPaymentByOrderNumberAndPassword(String orderNumber, String password);

    Page<ReviewDTO> getReviews(String id, int page, int pageSize);

    // void saveReview(String id, ReviewRequestDTO reviewRequestDTO);

    void saveReview(String id, Integer productId, Integer optionId, String contents, Integer score,
            MultipartFile[] imageFiles);
}
