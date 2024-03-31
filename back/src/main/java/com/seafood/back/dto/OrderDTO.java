package com.seafood.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderDTO {
    private Integer cartId;
    private Integer productId;
    private Integer optionId;
    private Integer quantity;
}
