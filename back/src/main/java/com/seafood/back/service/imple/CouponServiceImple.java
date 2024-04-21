package com.seafood.back.service.imple;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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
    public BigDecimal couponAmount(String id, CouponDTO coupon) {
        if (id == null || coupon == null) {
            return BigDecimal.ZERO;
        }

        List<MemberCouponEntity> coupons = memberCouponRepository.findCouponsByMemberId(id);

        CouponEntity sameCoupon = coupons.stream()
                .filter(c -> c.getCoupon().getCouponId().equals(coupon.getCouponId())
                        && c.getCoupon().getDiscount().equals(coupon.getDiscount()))
                .findFirst()
                .map(MemberCouponEntity::getCoupon)
                .orElse(null);

        return sameCoupon.getDiscount();

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
}
