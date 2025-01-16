package com.seafood.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.AdEntity;

@Repository
public interface AdRepository extends JpaRepository<AdEntity, Long> {

}
