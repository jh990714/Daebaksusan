package com.seafood.back.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

import com.seafood.back.entity.AdEntity;

@Data
@Builder
public class AdDTO {

    private Long id; // 광고 ID
    private String imageUrl; // 광고 이미지 URL
    private String linkUrl; // 광고 링크 URL
    private LocalDate startDate; // 광고 시작 날짜
    private LocalDate endDate;
    private boolean active;

    public static AdDTO fromEntity(AdEntity ad) {
        boolean isActive = ad.getStartDate() != null && ad.getEndDate() != null
                && !LocalDate.now().isBefore(ad.getStartDate())
                && !LocalDate.now().isAfter(ad.getEndDate());

        return AdDTO.builder()
                .id(ad.getAdId())
                .imageUrl(ad.getImageUrl())
                .linkUrl(ad.getLinkUrl())
                .startDate(ad.getStartDate())
                .endDate(ad.getEndDate())
                .active(isActive)
                .build();
    }
}
