package com.seafood.back.service;

import java.math.BigDecimal;

import com.seafood.back.dto.MemberDTO;
import com.seafood.back.dto.MemberUpdateDTO;
import com.seafood.back.entity.MemberEntity;

public interface MemberService {
    public MemberEntity authenticateMember(String username, String password);
    public String getAccessToken(String userName);
    public String getRefreshToken(String userName);
    public MemberEntity registerNewMember(MemberEntity member);
    public MemberDTO getMemberInfo(String id);
    public BigDecimal getAvailablePoints(String id);
    public BigDecimal deductPoints(String id, BigDecimal points);
    public void updateMember(MemberUpdateDTO memberUpdateDTO);
    public void withdrawMember(String memberId, String password);
}

