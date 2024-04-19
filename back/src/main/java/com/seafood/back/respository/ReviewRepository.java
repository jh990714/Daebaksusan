package com.seafood.back.respository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {

    List<ReviewEntity> findByProductId(Integer productId);

    Page<ReviewEntity> findByProductId(Integer productId, Pageable pageable);

    Page<ReviewEntity> findByMemberIdOrderByReviewDateDesc(int i, Pageable pageable);

    boolean existsByProductIdAndOptionIdAndMemberIdAndOrderNumber(Integer productId, Integer optionId, String memberId,
            String orderNumber);

    ReviewEntity findByProductIdAndOptionIdAndMemberIdAndOrderNumber(Integer productId, Integer optionId, String memberId,
            String orderNumber);
}
