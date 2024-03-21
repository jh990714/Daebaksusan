package com.seafood.back.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seafood.back.entity.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    Optional<MemberEntity> findByMemberId(String memberId);
}