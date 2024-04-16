package com.seafood.back.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.seafood.back.dto.ReviewDTO;


public interface ReviewService {
    public Page<ReviewDTO> findReviews(Integer productId, int page, int size );
}
