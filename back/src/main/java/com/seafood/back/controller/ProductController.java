package com.seafood.back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.entity.ProductEntity;

import com.seafood.back.service.ProductService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductEntity>> getAllProduct() {
        List<ProductEntity> product = productService.findProductAll();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity<List<ProductEntity>> getBestProduct() {
        List<ProductEntity> product = productService.findProductBest();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<List<ProductEntity>> getNewProduct() {
        List<ProductEntity> product = productService.findProductNew();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    
}

