package com.seafood.back.service.imple;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seafood.back.entity.MemberEntity;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.service.MemberService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor

public class MemberServiceImple implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberEntity registerNewMember(MemberEntity member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        return memberRepository.save(member);
    }

}
