package com.seafood.back.service;

import java.math.BigDecimal;
import java.util.List;

import com.seafood.back.dto.CouponDTO;

public interface CouponService {
    public BigDecimal couponAmount(String id, CouponDTO coupon);
    public List<CouponDTO> mapCouponsToDTOs(String memberId);
    public void removeCoupon(String id, Long couponId);
}
