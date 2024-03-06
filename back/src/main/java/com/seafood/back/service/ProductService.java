package com.seafood.back.service;

import java.util.List;

import com.seafood.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductEntity> findProductAll();
}
