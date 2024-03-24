package com.seafood.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.LoginRequest;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.service.MemberService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (memberService.authenticateMember(loginRequest.getUserName(), loginRequest.getPassword())) {
            String accessToken = memberService.getAccessToken(loginRequest.getUserName());
            String refreshToken = memberService.getRefreshToken(loginRequest.getUserName());
            TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
            
            return ResponseEntity.ok(tokenResponse);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패"); // 실패 시 401 반환
    }
    
    @PostMapping("/signUp")
    public ResponseEntity<MemberEntity> registerMember(@RequestBody MemberEntity member) {
        MemberEntity registeredMember = memberService.registerNewMember(member);
        return ResponseEntity.ok(registeredMember);
    }
}

@Getter
@Setter
class TokenResponse {
    private String accessToken;
    private String refreshToken;

    public TokenResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}