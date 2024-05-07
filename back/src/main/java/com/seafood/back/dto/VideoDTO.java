package com.seafood.back.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VideoDTO {
    private Long videoId;
    private String videoUrl;
    private List<ProductDTO> products;
}
