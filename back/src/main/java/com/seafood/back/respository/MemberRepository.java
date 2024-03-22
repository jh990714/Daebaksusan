package com.seafood.back.respository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    MemberEntity findByMemberId(String memberId);
}