package com.seafood.back.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.seafood.back.dto.MemberDTO;
import com.seafood.back.dto.MemberUpdateDTO;
import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.dto.ReviewCriteriaDTO;
import com.seafood.back.dto.ReviewDTO;

public interface InfoService {
    MemberDTO getUserInfo(String id);

    Page<PaymentDetailDTO> getOrdertDetails(String id, int page, int size);
    List<PaymentDetailDTO> getPaymentByOrderNumberAndPassword(String orderNumber, String password);


    // void saveReview(String id, ReviewRequestDTO reviewRequestDTO);

    void saveReview(String id, String orderNumber, Integer productId, Integer optionId, String contents, Integer score,
            MultipartFile[] imageFiles);

    ReviewDTO getReviews(String id, ReviewCriteriaDTO reviewCriteriaDTO);

    void updateInfo(String id, MemberUpdateDTO memberUpdateDTO);

}
