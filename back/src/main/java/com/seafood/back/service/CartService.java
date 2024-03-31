package com.seafood.back.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.entity.CartEntity;

public interface CartService {
    public List<CartDTO> getCartItemsForMember(String memberId);
    public void deleteSelectedCartItems(String memberId, List<Long> cartItemIdsToDelete);
    ResponseEntity<?> saveCartItems(String memberId, CartEntity[] cartItems);
    public CartEntity addToCart(String memberId, Integer productId, Integer optionId, Integer quantity, Integer boxCnt);
}
