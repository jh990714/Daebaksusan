package com.seafood.back.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.entity.MemberEntity;
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
    public ResponseEntity<MemberEntity> myPage(Authentication authentication) {
        String id = authentication.getName();
        MemberEntity userInfo = infoService.getUserInfo(id);

        return ResponseEntity.ok().body(userInfo);
    }

    @GetMapping("/orderDetails")
    public ResponseEntity<?> getOrderDetails(Authentication authentication,
                                               @RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int pageSize) {
        try {
            String id = authentication.getName();
            Page<PaymentDetailDTO> paymentDetails = infoService.getOrdertDetails(id, page, pageSize);
            return ResponseEntity.ok().body(paymentDetails);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패");
        }
    }


}