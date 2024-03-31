package com.seafood.back.service;

import java.util.List;

import com.seafood.back.dto.CartDTO;

public interface CartService {
    public List<CartDTO> getCartItemsForMember(String memberId);
    public void deleteSelectedCartItems(String memberId, List<Long> cartItemIdsToDelete);
}
