package com.seafood.back.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.seafood.back.service.InfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/info")
public class InfoController {

    private final InfoService infoService;

    @GetMapping
    public ResponseEntity<String> myPage(Authentication authentication) {
        String username = authentication.getName();
        String userInfo = infoService.getUserInfo(username);

        log.info(userInfo);
        return ResponseEntity.ok().body(userInfo);
    }

}