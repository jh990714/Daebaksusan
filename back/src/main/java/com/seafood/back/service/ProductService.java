package com.seafood.back.service;

import java.util.List;

import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductEntity> findProductAll();
    public List<ProductEntity> findProductBest();
    public List<ProductEntity> findProductNew();
    public List<OptionEntity> findOption(Integer productId);
}
