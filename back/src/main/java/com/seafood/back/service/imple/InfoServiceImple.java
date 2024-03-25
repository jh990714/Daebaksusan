package com.seafood.back.service.imple;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seafood.back.entity.CartEntity;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.respository.CartRepository;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.service.InfoService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class InfoServiceImple implements InfoService {

    private final MemberRepository memberRepository;
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

    @Override
    public void addToCart(String memberId, Integer productId, Integer optionId, Integer quantity, Integer boxCnt) {
        CartEntity cart = new CartEntity();
        cart.setMemberId(memberId);
        cart.setProductId(productId);
        cart.setOptionId(optionId);
        cart.setQuantity(quantity);
        cart.setBoxCnt(boxCnt);
        cart.setUpdatedAt(LocalDateTime.now());

        cartRepository.save(cart);
    }
}