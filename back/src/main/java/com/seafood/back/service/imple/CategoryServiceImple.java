package com.seafood.back.service.imple;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CategoryDTO;
import com.seafood.back.dto.CategoryDTO.SubcategoryDTO;
import com.seafood.back.entity.CategoryEntity;
import com.seafood.back.respository.CategoryRepository;
import com.seafood.back.service.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImple implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<CategoryDTO> categoryDTOs = new ArrayList<>();
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        for (CategoryEntity categoryEntity : categoryEntities) {
            if (categoryEntity.getCategoryId() == 1 || !categoryEntity.getSubcategories().isEmpty()) {
                CategoryDTO categoryDTO = new CategoryDTO();
                categoryDTO.setId(categoryEntity.getCategoryId());
                categoryDTO.setName(categoryEntity.getName());
                List<SubcategoryDTO> subcategoryDTOs = new ArrayList<>();
                for (CategoryEntity subcategoryEntity : categoryEntity.getSubcategories()) {
                    SubcategoryDTO subcategoryDTO = new SubcategoryDTO();
                    subcategoryDTO.setId(subcategoryEntity.getCategoryId());
                    subcategoryDTO.setName(subcategoryEntity.getName());
                    // 필요한 경우 SubcategoryDTO에 추가 정보를 설정합니다.
                    subcategoryDTOs.add(subcategoryDTO);
                }
                categoryDTO.setSubcategories(subcategoryDTOs);
                categoryDTOs.add(categoryDTO);
            }
        }
        return categoryDTOs;
    }
}
