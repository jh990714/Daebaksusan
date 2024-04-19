package com.seafood.back.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequestDTO {
    Integer productId;
    Integer optionId;
    String contents;
    Integer score;
    MultipartFile[] imageFiles;
}
