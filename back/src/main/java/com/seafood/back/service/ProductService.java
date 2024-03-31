package com.seafood.back.service;

import java.util.List;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductEntity> findProductAll();
    public List<ProductEntity> findProductBest();
    public List<ProductEntity> findProductNew();
    public List<OptionEntity> findOption(Integer productId);
    public List<ProductEntity> getProductsByCategoryAndSubcategories(Long categoryId);
    public List<ProductEntity> getProductsByCategorySub(Long categoryId);
    public List<ProductEntity> searchProducts(String query);
    public ProductEntity getProductById(Integer productId);
    public OptionEntity getOptionById(Integer optionId);
}
