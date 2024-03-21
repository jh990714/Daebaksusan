package com.seafood.back.service.imple;

import java.util.Optional;
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
    private String secretKey;

    private Long expiredMs = (long) (1000 * 60 * 601);

    @Override
    public String getToken(String userName) {
        return JwtUtil.creatJwt(userName, secretKey, expiredMs);
    }

    @Override
    public boolean authenticateMember(String memberId, String password) {
        Optional<MemberEntity> user = memberRepository.findByMemberId(memberId);

        if (user.isEmpty() || !passwordEncoder.matches(password, user.get().getPassword())) {
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
