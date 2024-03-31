package com.seafood.back.service;

public interface InfoService {
    String getUserInfo(String username);
    void addToCart(String memberId, Integer productId, Integer optionId, Integer quantity, Integer boxCnt);
}
