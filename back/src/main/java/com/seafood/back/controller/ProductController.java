package com.seafood.back.controller;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductService productService;
     private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAllProduct() {
        List<ProductDTO> product = productService.findProductAll();
        logger.info("testProductController");
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

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long productId) {
        ProductDTO product = productService.findProduct(productId);
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<ProductDTO>> getRecommendProduct() {
        List<ProductDTO> product = productService.findProductRecommend();
    
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/{productId}/options")
    public ResponseEntity<List<OptionEntity>> getOption(@PathVariable Long productId) {
        List<OptionEntity> option = productService.findOption(productId);
    
        return new ResponseEntity<>(option, HttpStatus.OK);
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategoryAndSubcategories(@PathVariable String categoryName) {
        List<ProductDTO> products = productService.getProductsByCategoryAndSubcategories(categoryName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category/sub/{categoryName}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategorySub(@PathVariable String categoryName) {
        List<ProductDTO> product = productService.getProductsByCategorySub(categoryName);

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

    
    @GetMapping("/productInfo")
    public ResponseEntity<String> getProductInfoImage(@RequestParam Long productId) {
        String productImgUrl = null;
        try {
            productImgUrl = productService.getProductInfoImage(productId);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(productImgUrl, HttpStatus.OK);

    }
    
    
}

