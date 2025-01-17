package com.seafood.back.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.AdEntity;

@Repository
public interface AdRepository extends JpaRepository<AdEntity, Long> {
    @Query("SELECT a FROM AdEntity a WHERE :currentDate BETWEEN a.startDate AND a.endDate")
    List<AdEntity> findActiveAds(@Param("currentDate") LocalDate currentDate);
}
