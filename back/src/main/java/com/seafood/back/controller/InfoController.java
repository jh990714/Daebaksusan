package com.seafood.back.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.entity.CartEntity;
import com.seafood.back.service.InfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/info")
public class InfoController {

    private final InfoService infoService;
    private static final Logger logger = LoggerFactory.getLogger(InfoController.class);

    @GetMapping
    public ResponseEntity<String> myPage(Authentication authentication) {
        String username = authentication.getName();
        String userInfo = infoService.getUserInfo(username);

        log.info(userInfo);
        return ResponseEntity.ok().body(userInfo);
    }

    @PostMapping("/cart")
    public ResponseEntity<String> addToCart(@RequestBody CartEntity cart, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        String memberId = authentication.getName();
        infoService.addToCart(memberId, cart.getProductId(), cart.getOptionId(), cart.getQuantity(), cart.getBoxCnt());

        return new ResponseEntity<>("Added to cart", HttpStatus.OK);
    }
}