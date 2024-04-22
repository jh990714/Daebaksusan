package com.seafood.back.service.imple;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CouponAmountResult;
import com.seafood.back.dto.CouponDTO;
import com.seafood.back.entity.CouponEntity;
import com.seafood.back.entity.MemberCouponEntity;
import com.seafood.back.respository.MemberCouponRepository;
import com.seafood.back.service.CouponService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class CouponServiceImple implements CouponService{
    private final MemberCouponRepository memberCouponRepository;
    
    @Override
    public CouponAmountResult couponAmount(String id, CouponDTO coupon) {
        if (id == null || coupon == null) {
            return new CouponAmountResult(BigDecimal.ZERO, BigDecimal.ZERO);
        }

        List<MemberCouponEntity> coupons = memberCouponRepository.findCouponsByMemberId(id);

        CouponEntity sameCoupon = coupons.stream()
                .filter(c -> c.getCoupon().getCouponId().equals(coupon.getCouponId())
                        && c.getCoupon().getDiscount().equals(coupon.getDiscount()))
                .findFirst()
                .map(MemberCouponEntity::getCoupon)
                .orElse(null);

        BigDecimal couponAmount = sameCoupon.getDiscount();
        BigDecimal minimumOrderAmount = sameCoupon.getMinimumOrderAmount();

        return new CouponAmountResult(couponAmount, minimumOrderAmount);
    }

    @Override
    public List<CouponDTO> mapCouponsToDTOs(String memberId) {
        // 회원이 가진 쿠폰 정보를 가져옴
        List<MemberCouponEntity> coupons = memberCouponRepository.findCouponsByMemberId(memberId);
        
        // 가져온 쿠폰 정보를 DTO에 매핑하여 반환
        return coupons.stream()
                      .map(coupon -> {
                          CouponDTO dto = new CouponDTO();
                          dto.setCouponId(coupon.getCoupon().getCouponId());
                          dto.setCouponName(coupon.getCoupon().getCouponName());
                          dto.setDiscount(coupon.getCoupon().getDiscount());
                          dto.setMinimumOrderAmount(coupon.getCoupon().getMinimumOrderAmount());
                          dto.setIssueDate(coupon.getIssueDate());
                          dto.setValidUntil(coupon.getValidUntil());
                          return dto;
                      })
                      .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void removeCoupon(String id, Long couponId) {
        try {
            log.info(couponId.toString());
            memberCouponRepository.deleteByCouponCouponIdAndMemberId(couponId, id);
        } catch (Exception e) {
            throw e;
        }
        
    }

    @Override
    public void returnCoupon(String memberId, CouponDTO coupon) {
        // 사용된 쿠폰을 회원의 보유 쿠폰 목록에 추가하는 기능을 구현합니다.
        MemberCouponEntity memberCoupon = new MemberCouponEntity();
        memberCoupon.setMemberId(memberId);
        memberCoupon.setCouponId(coupon.getCouponId()); // 쿠폰 ID 설정
        memberCoupon.setIssueDate(coupon.getIssueDate());
        memberCoupon.setValidUntil(coupon.getValidUntil());

        memberCouponRepository.save(memberCoupon);
    }
    
   
}