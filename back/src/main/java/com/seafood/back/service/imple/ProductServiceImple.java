package com.seafood.back.service.imple;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.ProductService;

@Service
public class ProductServiceImple implements ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductEntity> findProductAll() {
        List<ProductEntity> products = new ArrayList<>();
        productRepository.findAll().forEach(e -> products.add(e));
        return products;
    }
    
}
