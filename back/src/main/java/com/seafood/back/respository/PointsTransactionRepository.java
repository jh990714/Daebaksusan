package com.seafood.back.respository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.PointsDetailsEntity;

public interface PointsTransactionRepository extends JpaRepository<PointsDetailsEntity, Integer>{
    Page<PointsDetailsEntity> findByMemberIdOrderByPtIdDesc(String memberId, Pageable pageable);
}