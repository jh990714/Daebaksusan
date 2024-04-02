package com.seafood.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "carts")
@Getter
@Setter
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "option_id")
    private Integer optionId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "box_cnt")
    private Integer boxCnt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
