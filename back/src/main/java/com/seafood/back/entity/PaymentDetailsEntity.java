package com.seafood.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "payment_details")
@Getter @Setter
public class PaymentDetailsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_detail_id")
    private Long paymentDetailId;

    @Column(name = "order_number")
    private String orderNumber;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "imp_uid")
    private String impUid;

    @Column(name = "is_cancel")
    private Boolean isCancel;
}
