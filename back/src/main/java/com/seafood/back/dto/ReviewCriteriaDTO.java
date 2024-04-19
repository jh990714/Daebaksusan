package com.seafood.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewCriteriaDTO {
    private Integer productId;
    private Integer optionId;
    private String orderNumber;
}
