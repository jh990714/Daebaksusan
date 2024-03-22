package com.seafood.back.service;

import com.seafood.back.entity.MemberEntity;

public interface MemberService {
    boolean authenticateMember(String username, String password);
    String getAccessToken(String userName);
    String getRefreshToken(String userName);
    MemberEntity registerNewMember(MemberEntity member);
}

