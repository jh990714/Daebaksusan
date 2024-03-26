package com.seafood.back.dto;


import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class CartDTO {
    private Long cartId;
    private ProductDTO product;
    private OptionDTO option;
    private Integer quantity;
    private Integer boxCnt;
}
