package com.seafood.back.service;

import java.util.List;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.PaymentItemDTO;
import com.seafood.back.dto.ProductDTO;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductDealsEntity;
import com.seafood.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductDTO> findProductAll();
    public List<ProductDTO> findProductBest();
    public List<ProductDTO> findProductNew();
    public List<OptionEntity> findOption(Integer productId);
    public List<ProductDTO> getProductsByCategoryAndSubcategories(Long categoryId);
    public List<ProductDTO> getProductsByCategorySub(Long categoryId);
    public List<ProductDTO> searchProducts(String query);
    public ProductEntity getProductById(Integer productId);
    public OptionEntity getOptionById(Integer optionId);
    public void updateProductQuantities(List<CartDTO> orderItems);
    public List<ProductDealsEntity> findProductDeal();
    public ProductDTO convertToProductDTO(ProductEntity product, List<ProductDealsEntity> dealProducts);
    public List<ProductDTO> convertProductEntitiesToDTOs(List<ProductEntity> products);
    public List<ProductDTO> getTimeDealProducts();
    public List<ProductDTO> findProductRecommend();
    public void addProductQuantities(List<PaymentItemDTO> orderItems);
}
