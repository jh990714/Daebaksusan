package com.seafood.back.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OptionDTO {
    private Integer optionId;
    private Integer productId;
    private String name;
    private BigDecimal addPrice;
    // 다른 필드들도 추가해야 함
}

