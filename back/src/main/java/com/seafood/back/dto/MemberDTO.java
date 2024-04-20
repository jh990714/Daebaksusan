package com.seafood.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberDTO {
    private Integer memberId;
    private String id;
    private String name;
    private String phone;
    private String email;
    private String postalCode;
    private String address;
    private String detailAddress;
}
