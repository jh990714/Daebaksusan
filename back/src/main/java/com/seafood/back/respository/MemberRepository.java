package com.seafood.back.respository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {
    MemberEntity findById(String id);

    MemberEntity findByMemberId(int memberId);
}