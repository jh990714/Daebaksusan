package com.seafood.back.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.MemberEntity;


@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String>{

    MemberEntity findByMemberId(String memberId);

}