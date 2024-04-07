package com.seafood.back.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.ReviewResponseEntity;

public interface ReviewResponseRepository extends JpaRepository<ReviewResponseEntity, Integer> {

    List<ReviewResponseEntity> findByReviewId(int reviewId);
    
}
