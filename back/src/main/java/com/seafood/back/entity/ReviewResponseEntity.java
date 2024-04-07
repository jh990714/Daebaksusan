package com.seafood.back.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name="review_response")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Entity
public class ReviewResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id")
    private Integer responseId;

    @Column(name = "review_id")
    private Integer reviewId;
    
    @Column(name = "admin_id")
    private Integer adminId;

    @Column(name = "response_text")
    private String responseText;

    @Column(name = "response_date")
    private LocalDateTime responseDate;
}