package com.seafood.back.service.imple;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.entity.CategoryEntity;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.CategoryRepository;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OptionRepository optionRepository;


    @Override
    public List<ProductEntity> findProductAll() {
        List<ProductEntity> products = new ArrayList<>();
        productRepository.findAll().forEach(e -> products.add(e));
        return products;
    }

    @Override
    public List<ProductEntity> findProductBest() {
        
        return null;
    }

    @Override
    public List<ProductEntity> findProductNew() {
        List<ProductEntity> products = new ArrayList<>();
        productRepository.findTop10ByOrderByProductIdDesc().forEach(e -> products.add(e));
        return products;
    }

    @Override
    public List<OptionEntity> findOption(Integer productId) {
        List<OptionEntity> options = new ArrayList<>();
        optionRepository.findByProductId(productId).forEach(e -> options.add(e));
        return options;
    }

    @Override
    public List<ProductEntity> getProductsByCategoryAndSubcategories(Long categoryId) {
         List<ProductEntity> products = new ArrayList<>();

         if (categoryId == 1) {
            // categoryId가 1이면 모든 제품을 반환
            products.addAll(productRepository.findAll());
        } else {
        
            // 상위 카테고리 조회
            Optional<CategoryEntity> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent()) {
                CategoryEntity category = categoryOptional.get();
                
                // 상위 카테고리의 하위 카테고리들 조회
                List<CategoryEntity> subcategories = category.getSubcategories();
                if (subcategories.isEmpty()) {
                    // 하위 카테고리가 없으면 상위 카테고리의 제품들을 가져옴
                    products.addAll(category.getProducts());
                } else {
                    // 하위 카테고리들에 속한 제품들을 모두 가져옴
                    for (CategoryEntity subcategory : subcategories) {
                        products.addAll(subcategory.getProducts());
                    }
                }
            }
            
            
        }
        return products;
    }

    @Override
    public List<ProductEntity> getProductsByCategorySub(Long categoryId) {
        // 카테고리에 따른 제품 데이터를 데이터베이스에서 조회하여 반환
        return productRepository.findByCategory(categoryId);
    }

    public List<ProductEntity> searchProducts(String query) {
        return productRepository.findTop5ByNameContaining(query);
    }

    @Override
    public ProductEntity getProductById(Integer productId) {

        return productRepository.findByProductId(productId);
    }

    @Override
    public OptionEntity getOptionById(Integer optionId) {
        
        return optionRepository.findByOptionId(optionId);
    }
    
}
