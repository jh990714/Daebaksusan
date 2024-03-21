package com.seafood.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seafood.back.entity.MemberEntity;
import com.seafood.back.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signUp")
    public ResponseEntity<MemberEntity> registerMember(@RequestBody MemberEntity member) {
        MemberEntity registeredMember = memberService.registerNewMember(member);
        return ResponseEntity.ok(registeredMember);
    }
}
