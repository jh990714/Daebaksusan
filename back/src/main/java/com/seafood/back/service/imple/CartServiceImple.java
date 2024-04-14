package com.seafood.back.service.imple;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.OptionDTO;
import com.seafood.back.dto.ProductDTO;
import com.seafood.back.entity.CartEntity;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductDealsEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.CartRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.CartService;
import com.seafood.back.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImple implements CartService{


    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    @Override
    public List<CartDTO> getCartItemsForMember(String id) {
        List<CartEntity> cartItems = cartRepository.findByMemberIdOrderByUpdatedAtDesc(id);
        List<CartDTO> cartDTOs = new ArrayList<>();
        List<ProductDealsEntity> productDeals = productService.findProductDeal();

        
        for (CartEntity cartItem : cartItems) {
            ProductEntity product = productService.getProductById(cartItem.getProductId());
            ProductDTO productDTO = productService.convertToProductDTO(product, productDeals);

            OptionEntity option = productService.getOptionById(cartItem.getOptionId());

            CartDTO cartDTO = new CartDTO();
            cartDTO.setCartId(cartItem.getCartId());
            cartDTO.setProduct(productDTO);
            cartDTO.setOption(convertToOptionDTO(option));
            cartDTO.setQuantity(cartItem.getQuantity());
            cartDTO.setBoxCnt(cartItem.getBoxCnt());
            cartDTOs.add(cartDTO);
        }
        return cartDTOs;
    }

    @Override
    @Transactional
    public void deleteSelectedCartItems(String id, List<Long> cartItemIdsToDelete) {
        cartRepository.deleteByMemberIdAndCartIdIn(id, cartItemIdsToDelete);
    }


    @SuppressWarnings("null")
    @Override
    public CartEntity addToCart(String id, Integer productId, Integer optionId, Integer quantity, Integer boxCnt) {
        Optional<CartEntity> existingCartItemOptional = cartRepository.findByMemberIdAndProductIdAndOptionId(id,
                productId, optionId);

        Optional<ProductEntity> productOptional = productRepository.findById(productId);

        if (existingCartItemOptional.isPresent()) {
            // 이미 장바구니에 해당 상품과 옵션을 가진 아이템이 존재하는 경우
            CartEntity existingCartItem = existingCartItemOptional.get();

            
            // 기존 quantity와 새로운 quantity를 합산합니다.
            int totalQuantity = existingCartItem.getQuantity() + quantity;
            int newboxCnt = (int) Math.ceil((double) totalQuantity / productOptional.get().getMaxQuantityPerDelivery());

            // // 최대 수량을 초과하지 않는지 확인합니다.
            
            if (totalQuantity > productOptional.get().getStockQuantity()) {
                // 최대 수량을 초과할 경우 에러 처리 또는 예외 처리를 할 수 있습니다.
                throw new IllegalArgumentException("최대 수량을 초과했습니다.");
            }

            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity); // 수량을 합산합니다.
            existingCartItem.setBoxCnt(newboxCnt); // 박스 수량을 조정
            existingCartItem.setUpdatedAt(LocalDateTime.now()); // 업데이트된 날짜로 갱신합니다.
            CartEntity savedCartItem = cartRepository.save(existingCartItem); // 저장소에 업데이트된 아이템을 저장합니다.

            return savedCartItem;
        } else {
            if (quantity > productOptional.get().getStockQuantity()) {
                // 최대 수량을 초과할 경우 에러 처리 또는 예외 처리를 할 수 있습니다.
                throw new RuntimeException("최대 수량을 초과했습니다.");
            }

            // 장바구니에 해당 상품과 옵션을 가진 아이템이 존재하지 않는 경우
            CartEntity cart = new CartEntity();
            cart.setMemberId(id);
            cart.setProductId(productId);
            cart.setOptionId(optionId);
            cart.setQuantity(quantity);
            cart.setBoxCnt(boxCnt);
            cart.setUpdatedAt(LocalDateTime.now());

            CartEntity savedCartItem = cartRepository.save(cart); // 새로운 아이템을 장바구니에 추가합니다.
            return savedCartItem;
        }
    }

    @Override
    
    @Transactional
    public ResponseEntity<?> saveCartItems(String id, CartEntity[] cartItems) {
        try {
            for (CartEntity cartItem : cartItems) {
               addToCart(id, cartItem.getProductId(), cartItem.getOptionId(), cartItem.getQuantity(), cartItem.getBoxCnt());
            }

            return ResponseEntity.ok().build(); // 성공 응답
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 실패 응답
        }
    }

    private OptionDTO convertToOptionDTO(OptionEntity optionEntity) {
        OptionDTO optionDTO = new OptionDTO();
        if (optionEntity != null) { // optionEntity가 null이 아닌 경우에만 처리
            // OptionEntity의 필드들을 OptionDTO로 복사
            optionDTO.setOptionId(optionEntity.getOptionId());
            optionDTO.setProductId(optionEntity.getProductId());
            optionDTO.setName(optionEntity.getName());
            optionDTO.setAddPrice(optionEntity.getAddPrice());
            // 나머지 필드들도 복사
        }
        return optionDTO;
    }

    
    // private ProductDTO convertToProductDTO(ProductEntity productEntity) {
    //     ProductDTO productDTO = new ProductDTO();
    //     // ProductEntity의 필드들을 ProductDTO로 복사
    //     productDTO.setProductId(productEntity.getProductId());
    //     productDTO.setCategory(productEntity.getCategory());
    //     productDTO.setName(productEntity.getName());
    //     productDTO.setImageUrl(productEntity.getImageUrl());
    //     productDTO.setStockQuantity(productEntity.getStockQuantity());
    //     productDTO.setRegularPrice(productEntity.getRegularPrice());
    //     productDTO.setSalePrice(productEntity.getSalePrice());
    //     productDTO.setShippingCost(productEntity.getShippingCost());
    //     productDTO.setDescription(productEntity.getDescription());
    //     productDTO.setArrivalDate(productEntity.getArrivalDate());
    //     productDTO.setRecommended(productEntity.getRecommended());
    //     productDTO.setMaxQuantityPerDelivery(productEntity.getMaxQuantityPerDelivery());


    //     // 나머지 필드들도 복사
    //     return productDTO;
    // }
}
    
