package com.seafood.back.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.MemberCouponEntity;

import java.util.List;

public interface MemberCouponRepository extends JpaRepository<MemberCouponEntity, Long> {
    List<MemberCouponEntity> findCouponsByMemberId(String memberId);

    void deleteByCouponCouponIdAndMemberId(Long couponId, String memberId);
}