package com.seafood.back.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PaymentDetailDTO {
    private String orderNumber;
    private Date orderDate;
    private List<PaymentItemDTO> orderItems;
    private boolean isCancel = false;
    private CouponDTO coupon;
    private BigDecimal points;
}