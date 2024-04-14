package com.seafood.back.service.imple;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.ProductDTO;
import com.seafood.back.entity.CategoryEntity;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductDealsEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.CategoryRepository;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.ProductDealsRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OptionRepository optionRepository;
    private final ProductDealsRepository productDealsRepository;

    @Override
    public List<ProductDTO> findProductAll() {
    // 모든 상품 조회
        List<ProductEntity> products = productRepository.findAll();

        List<ProductDTO> productDTOs = convertProductEntitiesToDTOs(products);

        return productDTOs;
    }
    
    

    @Override
    public List<ProductDTO> findProductBest() {
        
        return null;
    }

    @Override
    public List<ProductDTO> findProductNew() {
        List<ProductEntity> products = productRepository.findTop10ByOrderByProductIdDesc();
        
        List<ProductDTO> productDTOs = convertProductEntitiesToDTOs(products);

        return productDTOs;
    }

    @Override
    public List<OptionEntity> findOption(Integer productId) {
        List<OptionEntity> options = new ArrayList<>();
        optionRepository.findByProductId(productId).forEach(e -> options.add(e));
        return options;
    }

    @Override
    public List<ProductDTO> getProductsByCategoryAndSubcategories(Long categoryId) {
        List<ProductEntity> products = new ArrayList<>();
    
        if (categoryId == 1) {
            // categoryId가 1이면 모든 제품을 반환
            products.addAll(productRepository.findAll());
        } else {
            // 상위 카테고리 조회
            Optional<CategoryEntity> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent()) {
                CategoryEntity category = categoryOptional.get();
    
                // 상위 카테고리의 하위 카테고리들 조회
                List<CategoryEntity> subcategories = category.getSubcategories();
                if (subcategories.isEmpty()) {
                    // 하위 카테고리가 없으면 상위 카테고리의 제품들을 가져옴
                    products.addAll(category.getProducts());
                } else {
                    // 하위 카테고리들에 속한 제품들을 모두 가져옴
                    for (CategoryEntity subcategory : subcategories) {
                        products.addAll(subcategory.getProducts());
                    }
                }
            }
        }
    
        List<ProductDTO> productDTOs = convertProductEntitiesToDTOs(products);

        return productDTOs;
    }
    

    @Override
    public List<ProductDTO> getProductsByCategorySub(Long categoryId) {
        // 카테고리에 따른 제품 데이터를 데이터베이스에서 조회하여 반환
        List<ProductEntity> products = productRepository.findByCategory(categoryId);
        List<ProductDTO> productDTOs = convertProductEntitiesToDTOs(products);

        return productDTOs;
    }

    public List<ProductDTO> searchProducts(String query) {
        List<ProductEntity> products = productRepository.findTop5ByNameContaining(query);

        List<ProductDTO> productDTOs = convertProductEntitiesToDTOs(products);

        return productDTOs;
    }

    @Override
    public ProductEntity getProductById(Integer productId) {

        return productRepository.findByProductId(productId);
    }

    @Override
    public OptionEntity getOptionById(Integer optionId) {
        
        return optionRepository.findByOptionId(optionId);
    }

    @Override
    @Transactional
    public void updateProductQuantities(List<CartDTO> orderItems) {
        for (CartDTO orderItem : orderItems) {
            int productId = orderItem.getProduct().getProductId();
            int orderedQuantity = orderItem.getQuantity();

            // 상품을 데이터베이스에서 조회하여 수량을 변경합니다.
            Optional<ProductEntity> productOptional = productRepository.findById(productId);
            if (productOptional.isPresent()) {
                ProductEntity product = productOptional.get();
                int currentStock = product.getStockQuantity();
                if (currentStock >= orderedQuantity) {
                    product.setStockQuantity(currentStock - orderedQuantity);
                    // 변경된 상품 정보를 데이터베이스에 저장합니다.
                    productRepository.save(product);
                } else {

                    throw new RuntimeException("주문된 수량이 재고보다 많습니다.");
                }
            } else {
                // 상품을 찾을 수 없는 경우의 예외 처리를 수행합니다.
                throw new RuntimeException("상품을 찾을 수 없습니다.");
            }
        }
    }

    @Override
    public List<ProductDealsEntity> findProductDeal() {
        // 현재 시간
        Date now = new Date();
        
        // 현재 시간에 해당하는 타임 특가가 적용되는 상품들 조회
        List<ProductDealsEntity> productDeals = productDealsRepository.findByStartDateBeforeAndEndDateAfter(now, now);
        
        return productDeals;
    }

    @Override
    public ProductDTO convertToProductDTO(ProductEntity product, List<ProductDealsEntity> dealProducts) {
        ProductDTO productDTO = new ProductDTO();
        // ProductEntity의 필드 값을 ProductDTO로 복사
        productDTO.setProductId(product.getProductId());
        productDTO.setCategory(product.getCategory());
        productDTO.setName(product.getName());
        productDTO.setImageUrl(product.getImageUrl());
        productDTO.setStockQuantity(product.getStockQuantity());
        productDTO.setRegularPrice(product.getRegularPrice());
        productDTO.setSalePrice(product.getSalePrice());
        productDTO.setShippingCost(product.getShippingCost());
        productDTO.setDescription(product.getDescription());
        productDTO.setArrivalDate(product.getArrivalDate());
        productDTO.setRecommended(product.getRecommended());
        productDTO.setMaxQuantityPerDelivery(product.getMaxQuantityPerDelivery());
    
        // 타임 특가가 적용된 경우에만 sale_price 변경
        for (ProductDealsEntity dealProduct : dealProducts) {
            if (product.getProductId().equals(dealProduct.getProductId())) {
                productDTO.setSalePrice(productDTO.getSalePrice().add(dealProduct.getDealPrice()));
                productDTO.setStartDate(dealProduct.getStartDate());
                productDTO.setEndDate(dealProduct.getEndDate());
                break;
            }
        }
    
        return productDTO;
    }

    @Override
    public List<ProductDTO> convertProductEntitiesToDTOs(List<ProductEntity> products) {
        // 결과를 저장할 리스트
        List<ProductDTO> productDTOs = new ArrayList<>();
        List<ProductDealsEntity> productDeals = findProductDeal();

        // 상품을 DTO로 변환하여 리스트에 추가
        for (ProductEntity product : products) {
            ProductDTO productDTO = convertToProductDTO(product, productDeals);
            productDTOs.add(productDTO);
        }
    
        return productDTOs;
    }



    @Override
    public List<ProductDTO> getTimeDealProducts() {
        List<ProductDealsEntity> productDeals = findProductDeal();

            // 타임딜 상품들의 productId들을 가져옵니다.
        List<Integer> productIds = productDeals.stream()
            .map(ProductDealsEntity::getProductId)
            .collect(Collectors.toList());
        
        // productId들로 해당 상품들을 조회합니다.
        List<ProductEntity> products = productRepository.findAllByProductIdIn(productIds);
        List<ProductDTO> productDTOs = convertProductEntitiesToDTOs(products);
        return productDTOs;
        
    }
    
 
}
