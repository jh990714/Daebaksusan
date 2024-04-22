package com.seafood.back.service;

import java.util.List;

import com.seafood.back.dto.CouponAmountResult;
import com.seafood.back.dto.CouponDTO;

public interface CouponService {
    public CouponAmountResult couponAmount(String id, CouponDTO coupon);
    public List<CouponDTO> mapCouponsToDTOs(String memberId);
    public void removeCoupon(String id, Long couponId);
    public void returnCoupon(String memberId, CouponDTO coupon);
}
