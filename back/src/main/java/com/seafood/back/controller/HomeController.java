package com.seafood.back.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.VideoDTO;
import com.seafood.back.entity.CarouselEntity;
import com.seafood.back.entity.VideoEntity;
import com.seafood.back.service.HomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping("/getCarousel")
    public List<CarouselEntity> getCarouselImageUrls() {
   
        return homeService.getCarouselImageUrls();
    }

    @GetMapping("/getVideoPlayer")
    public VideoDTO getVideoPlayer() {
   
        return homeService.getVideoPlayer();
    }
}
