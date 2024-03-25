package com.seafood.back.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.CartEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    // 여기에 추가적인 메서드가 필요하다면 선언할 수 있습니다.
}