package com.seafood.back.service;

import java.io.IOException;
import java.util.List;

import com.seafood.back.dto.VideoDTO;
import com.seafood.back.entity.CarouselEntity;

public interface HomeService {
    public List<CarouselEntity> getCarouselImageUrls();

    public VideoDTO getVideoPlayer();
}
