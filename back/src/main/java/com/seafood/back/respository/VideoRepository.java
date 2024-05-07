package com.seafood.back.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.VideoEntity;

public interface VideoRepository extends JpaRepository<VideoEntity, Long>{

    VideoEntity findFirstByOrderByVideoId();
    
}
