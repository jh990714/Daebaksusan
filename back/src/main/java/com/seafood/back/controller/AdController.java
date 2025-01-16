package com.seafood.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.AdDTO;
import com.seafood.back.service.AdService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/v1/ad")
@RequiredArgsConstructor
public class AdController {
    private final AdService adService;

    @GetMapping
    public ResponseEntity<List<AdDTO>> getAds() {
        // 서비스 계층에서 광고 데이터 가져오기
        List<AdDTO> ads = adService.getAds();
        return ResponseEntity.ok(ads);
    }
}
   
