package com.seafood.back.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CouponDTO {
    private Long couponId;
    private String couponName;
    private BigDecimal discount;
}
