package com.seafood.back.service;

import com.seafood.back.entity.MemberEntity;

public interface MemberService {
    boolean authenticateMember(String username, String password);
    String getToken(String userName);
    public MemberEntity registerNewMember(MemberEntity member);
}

