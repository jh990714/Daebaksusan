package com.seafood.back.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.entity.OptionEntity;
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

    @GetMapping("/{productId}/options")
    public ResponseEntity<List<OptionEntity>> getOption(@PathVariable Integer productId) {
        List<OptionEntity> option = productService.findOption(productId);
    
        return new ResponseEntity<>(option, HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductEntity>> getProductsByCategoryAndSubcategories(@PathVariable Long categoryId) {
        List<ProductEntity> products = productService.getProductsByCategoryAndSubcategories(categoryId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category/sub/{categoryId}")
    public ResponseEntity<List<ProductEntity>> getProductsByCategorySub(@RequestParam Integer categoryId) {
        List<ProductEntity> product = productService.getProductsByCategorySub(categoryId);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public  ResponseEntity<List<ProductEntity>>  searchProducts(@RequestParam String query) {
        List<ProductEntity> product = productService.searchProducts(query);
        
        return new ResponseEntity<>(product, HttpStatus.OK);
        
    }
    
}

