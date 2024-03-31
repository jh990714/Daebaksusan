package com.seafood.back.service.imple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.OptionDTO;
import com.seafood.back.dto.ProductDTO;
import com.seafood.back.entity.CartEntity;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.CartRepository;
import com.seafood.back.service.CartService;
import com.seafood.back.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImple implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    @Override
    public List<CartDTO> getCartItemsForMember(String memberId) {
        List<CartEntity> cartItems = cartRepository.findByMemberId(memberId);
        List<CartDTO> cartDTOs = new ArrayList<>();
        for (CartEntity cartItem : cartItems) {
            ProductEntity product = productService.getProductById(cartItem.getProductId());
            OptionEntity option = productService.getOptionById(cartItem.getOptionId());

            CartDTO cartDTO = new CartDTO();
            cartDTO.setCartId(cartItem.getCartId());
            cartDTO.setProduct(convertToProductDTO(product));
            cartDTO.setOption(convertToOptionDTO(option));
            cartDTO.setQuantity(cartItem.getQuantity());
            cartDTO.setBoxCnt(cartItem.getBoxCnt());
            cartDTOs.add(cartDTO);
        }
        return cartDTOs;
    }

    @Override
    @Transactional
    public void deleteSelectedCartItems(String memberId, List<Long> cartItemIdsToDelete) {
        cartRepository.deleteByMemberIdAndCartIdIn(memberId, cartItemIdsToDelete);
    }

    private ProductDTO convertToProductDTO(ProductEntity productEntity) {
        ProductDTO productDTO = new ProductDTO();
        // ProductEntity의 필드들을 ProductDTO로 복사
        productDTO.setProductId(productEntity.getProductId());
        productDTO.setCategory(productEntity.getCategory());
        productDTO.setName(productEntity.getName());
        productDTO.setImageUrl(productEntity.getImageUrl());
        productDTO.setStockQuantity(productEntity.getStockQuantity());
        productDTO.setRegularPrice(productEntity.getRegularPrice());
        productDTO.setSalePrice(productEntity.getSalePrice());
        productDTO.setShippingCost(productEntity.getShippingCost());
        productDTO.setDescription(productEntity.getDescription());
        productDTO.setArrivalDate(productEntity.getArrivalDate());
        productDTO.setRecommended(productEntity.getRecommended());
        productDTO.setMaxQuantityPerDelivery(productEntity.getMaxQuantityPerDelivery());


        // 나머지 필드들도 복사
        return productDTO;
    }

    private OptionDTO convertToOptionDTO(OptionEntity optionEntity) {
        OptionDTO optionDTO = new OptionDTO();
        // OptionEntity의 필드들을 OptionDTO로 복사
        optionDTO.setOptionId(optionEntity.getOptionId());
        optionDTO.setProductId(optionEntity.getProductId());
        optionDTO.setName(optionEntity.getName());
        optionDTO.setAddPrice(optionEntity.getAddPrice());
        // 나머지 필드들도 복사
        return optionDTO;
    }
}
