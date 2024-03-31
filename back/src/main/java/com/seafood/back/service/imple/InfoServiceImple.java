package com.seafood.back.service.imple;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seafood.back.entity.CartEntity;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.CartRepository;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.InfoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InfoServiceImple implements InfoService {

    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final ObjectMapper objectMapper; // JSON 변환을 위한 ObjectMapper

    @Override
    public String getUserInfo(String username) {
        MemberEntity user = memberRepository.findByMemberId(username);

        if (user != null) {
            try {
                return objectMapper.writeValueAsString(user);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "Failed to retrieve user info"; // JSON 변환 실패 시 예외 처리
            }
        } else {
            return "User not found"; // 사용자가 없을 경우 예외 처리
        }
    }

    @SuppressWarnings("null")
    @Override
    public void addToCart(String memberId, Integer productId, Integer optionId, Integer quantity, Integer boxCnt) {
        Optional<CartEntity> existingCartItemOptional = cartRepository.findByMemberIdAndProductIdAndOptionId(memberId,
                productId, optionId);

        if (existingCartItemOptional.isPresent()) {
            // 이미 장바구니에 해당 상품과 옵션을 가진 아이템이 존재하는 경우
            CartEntity existingCartItem = existingCartItemOptional.get();

            Optional<ProductEntity> productOptional = productRepository.findById(existingCartItem.getProductId());
            // 기존 quantity와 새로운 quantity를 합산합니다.
            int totalQuantity = existingCartItem.getQuantity() + quantity;
            // 상품의 maxQuantityPerDelivery로 나눈 후 올림하여 boxCnt에 할당합니다.
            int newboxCnt = (int) Math.ceil((double) totalQuantity / productOptional.get().getMaxQuantityPerDelivery());

            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity); // 수량을 합산합니다.
            existingCartItem.setBoxCnt(newboxCnt); // 박스 수량을 조정
            existingCartItem.setUpdatedAt(LocalDateTime.now()); // 업데이트된 날짜로 갱신합니다.
            cartRepository.save(existingCartItem); // 저장소에 업데이트된 아이템을 저장합니다.
        } else {
            // 장바구니에 해당 상품과 옵션을 가진 아이템이 존재하지 않는 경우
            CartEntity cart = new CartEntity();
            cart.setMemberId(memberId);
            cart.setProductId(productId);
            cart.setOptionId(optionId);
            cart.setQuantity(quantity);
            cart.setBoxCnt(boxCnt);
            cart.setUpdatedAt(LocalDateTime.now());

            cartRepository.save(cart); // 새로운 아이템을 장바구니에 추가합니다.
        }
    }
}