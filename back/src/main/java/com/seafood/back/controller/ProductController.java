package com.seafood.back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.ProductDTO;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;

import com.seafood.back.service.ProductService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAllProduct() {
        List<ProductDTO> product = productService.findProductAll();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity<List<ProductDTO>> getBestProduct() {
        List<ProductDTO> product = productService.findProductBest();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<List<ProductDTO>> getNewProduct() {
        List<ProductDTO> product = productService.findProductNew();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/{productId}/options")
    public ResponseEntity<List<OptionEntity>> getOption(@PathVariable Integer productId) {
        List<OptionEntity> option = productService.findOption(productId);
    
        return new ResponseEntity<>(option, HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategoryAndSubcategories(@PathVariable Long categoryId) {
        List<ProductDTO> products = productService.getProductsByCategoryAndSubcategories(categoryId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category/sub/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategorySub(@PathVariable Long categoryId) {
        List<ProductDTO> product = productService.getProductsByCategorySub(categoryId);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public  ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String query) {
        List<ProductDTO> product = productService.searchProducts(query);
        
        return new ResponseEntity<>(product, HttpStatus.OK);
        
    }

    @GetMapping("/timeDeal")
    public ResponseEntity<List<ProductDTO>> getTimeDealProducts() {
        List<ProductDTO> product = productService.getTimeDealProducts();

        return new ResponseEntity<>(product, HttpStatus.OK);

    }
    
    
}

