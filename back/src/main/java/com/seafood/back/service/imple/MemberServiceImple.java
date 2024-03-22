package com.seafood.back.service.imple;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seafood.back.entity.MemberEntity;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.service.MemberService;
import com.seafood.back.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor


public class MemberServiceImple implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String accessSecretKey;

    @Value("${jwt.refersh}")
    private String refreshSecretKey;

    private Long accessTokenExpiredMs = (long) (1000 * 60 * 30); // 액세스 토큰 만료 시간 (30분)
    private Long refreshTokenExpiredMs = (long) (1000 * 60 * 60 * 24 * 7); // 리프레시 토큰 만료 시간 (7일)


    @Override
    public String getAccessToken(String userName) {
        return JwtUtil.createJwt(userName, accessSecretKey, accessTokenExpiredMs);
    }

    @Override
    public String getRefreshToken(String userName) {
        return JwtUtil.createJwt(userName, refreshSecretKey, refreshTokenExpiredMs);
    }

    @Override
    public boolean authenticateMember(String memberId, String password) {
        MemberEntity user = memberRepository.findByMemberId(memberId);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return false;
        }
        return true;
        
    }

    @Override
    public MemberEntity registerNewMember(MemberEntity member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        return memberRepository.save(member);
    }

}
