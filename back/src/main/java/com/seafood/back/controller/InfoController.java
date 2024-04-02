package com.seafood.back.controller;


import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.PaymentDetailDTO;
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
        String id = authentication.getName();
        String userInfo = infoService.getUserInfo(id);

        log.info(userInfo);
        return ResponseEntity.ok().body(userInfo);
    }

    @GetMapping("/paymentDetails")
    public ResponseEntity<?> getPaymentDetails(Authentication authentication) {
        try {

            String memberId = authentication.getName();
            List<PaymentDetailDTO> paymentDetails = infoService.getPaymentDetails(memberId);
            
            return ResponseEntity.ok().body(paymentDetails);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("실패");
        }
    }
    

}