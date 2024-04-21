package com.seafood.back.service;

import java.math.BigDecimal;

import com.seafood.back.dto.MemberDTO;
import com.seafood.back.entity.MemberEntity;

public interface MemberService {
    public boolean authenticateMember(String username, String password);
    public String getAccessToken(String userName);
    public String getRefreshToken(String userName);
    public MemberEntity registerNewMember(MemberEntity member);
    public MemberDTO getMemberInfo(String id);
    public BigDecimal getAvailablePoints(String id);
    public void deductPoints(String id, BigDecimal points);
}

