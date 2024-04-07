package com.seafood.back.service;

import java.util.List;

import com.seafood.back.dto.ReviewDTO;


public interface ReviewService {
    public List<ReviewDTO> findReviews(Integer productId);
}
