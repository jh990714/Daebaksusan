package com.seafood.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.LoginRequest;
import com.seafood.back.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    
    private final MemberService memberService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        log.info(loginRequest.getPassword());
        if (memberService.authenticateMember(loginRequest.getUserName(), loginRequest.getPassword())) {
            String token = memberService.getToken(loginRequest.getUserName());
            return ResponseEntity.ok().body(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패"); // 실패 시 401 반환


    }
}
