package com.seafood.back.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.OptionEntity;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<OptionEntity, Integer> {
    List<OptionEntity> findByProductId(Integer productId);

    OptionEntity findByOptionId(Integer optionId);
}
