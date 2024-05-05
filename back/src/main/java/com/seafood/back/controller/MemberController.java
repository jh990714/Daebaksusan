package com.seafood.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.dto.LoginRequest;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.service.MemberService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.security.core.Authentication;


@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            MemberEntity member = memberService.authenticateMember(loginRequest.getId(), loginRequest.getPassword());

            String accessToken = memberService.getAccessToken(member.getMemberId());
            String refreshToken = memberService.getRefreshToken(member.getMemberId());
            TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
            
            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    
    @PostMapping("/signUp")
    public ResponseEntity<?> registerMember(@RequestBody MemberEntity member) {
        try {
            MemberEntity registeredMember = memberService.registerNewMember(member);
            return ResponseEntity.ok(registeredMember);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()); // 또는 다른 적절한 처리
        }
    }

    @DeleteMapping("/withdraw")
    public ResponseEntity<?> withdrawMember(Authentication authentication, @RequestBody LoginRequest loginRequest) {
        try {
            Long memberId = Long.parseLong(authentication.getName());

            memberService.withdrawMember(memberId, loginRequest.getPassword());
            
            return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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