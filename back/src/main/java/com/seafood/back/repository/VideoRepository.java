package com.seafood.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.PromotionalVideoEntity;

public interface VideoRepository extends JpaRepository<PromotionalVideoEntity, Long>{

    PromotionalVideoEntity findFirstByOrderByVideoId();
    
}
