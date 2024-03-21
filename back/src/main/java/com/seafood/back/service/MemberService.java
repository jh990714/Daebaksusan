package com.seafood.back.service;

import com.seafood.back.entity.MemberEntity;

public interface MemberService {
    public MemberEntity registerNewMember(MemberEntity member);
    // public JwtToken signIn(String username, String password);
}
