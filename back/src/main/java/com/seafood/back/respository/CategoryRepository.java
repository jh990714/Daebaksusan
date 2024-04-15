package com.seafood.back.respository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    List<CategoryEntity> findByParentCategoryIsNull();

    CategoryEntity findByName(String query);
}