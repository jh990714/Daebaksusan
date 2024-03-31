package com.seafood.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="members")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Entity
public class MemberEntity{
    @Id
    @Column(name = "member_id")
    private String memberId;
    
    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "address")
    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "type")
    private String type;

    @Column(name = "role")
    private String role;



    public MemberEntity(String memberId, String email, String type){
        this.memberId = memberId;
        this.password = "passw0rd";
        this.name = null;
        this.phone = null;
        this.email = email;
        this.postalCode = null;
        this.address = null;
        this.detailAddress = null;
        this.type = type;
        this.role = "ROLE_USER";
    }

}
