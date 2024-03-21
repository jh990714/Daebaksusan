package com.seafood.back.service;

public interface MemberService {
    boolean authenticateMember(String username, String password);
    String getToken(String userName);
}