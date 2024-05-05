package com.seafood.back.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.MemberCouponEntity;

import java.util.List;

public interface MemberCouponRepository extends JpaRepository<MemberCouponEntity, Long> {
    List<MemberCouponEntity> findCouponsByMember_memberId(Long memberId);

    void deleteByIdAndMember_memberId(Long id, Long memberId);
}