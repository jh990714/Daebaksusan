package com.seafood.back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.entity.ProductEntity;

import com.seafood.back.service.ProductService;


@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/product")
    public ResponseEntity<List<ProductEntity>> getAllProduct() {
        List<ProductEntity> product = productService.findProductAll();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}

