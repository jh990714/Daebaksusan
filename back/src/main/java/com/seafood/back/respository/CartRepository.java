package com.seafood.back.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.CartEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    List<CartEntity> findByMemberId(String memberId);
    void deleteByMemberIdAndCartIdIn(String memberId, List<Long> cartItemIdsToDelete);
    Optional<CartEntity> findByMemberIdAndProductIdAndOptionId(String memberId, Integer productId, Integer optionId);
    
}