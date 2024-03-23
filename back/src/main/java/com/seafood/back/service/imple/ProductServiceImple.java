package com.seafood.back.service.imple;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService{
    @Autowired
    private final ProductRepository productRepository;
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
    
}
