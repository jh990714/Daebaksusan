package com.seafood.back.service.imple;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CouponAmountResult;
import com.seafood.back.dto.CouponDTO;
import com.seafood.back.entity.CouponEntity;
import com.seafood.back.entity.MemberCouponEntity;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.respository.CouponRepository;
import com.seafood.back.respository.MemberCouponRepository;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.service.CouponService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class CouponServiceImple implements CouponService{
    private final MemberCouponRepository memberCouponRepository;
    private final CouponRepository couponRepository;
    private final MemberRepository memberRepository;
    
    @Override
    public CouponAmountResult couponAmount(Long memberId, CouponDTO coupon) {
        if (memberId == null || coupon == null) {
            return new CouponAmountResult(BigDecimal.ZERO, BigDecimal.ZERO);
        }

        List<MemberCouponEntity> coupons = memberCouponRepository.findCouponsByMember_memberId(memberId);

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
    public List<CouponDTO> mapCouponsToDTOs(Long memberId) {
        // 회원이 가진 쿠폰 정보를 가져옴
        List<MemberCouponEntity> coupons = memberCouponRepository.findCouponsByMember_memberId(memberId);
        
        // 가져온 쿠폰 정보를 DTO에 매핑하여 반환
        return coupons.stream()
                      .map(coupon -> {
                          CouponDTO dto = new CouponDTO();
                          dto.setId(coupon.getId());
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
    public void removeCoupon(Long memberId, Long id) {
        try {
            memberCouponRepository.deleteByIdAndMember_memberId(id, memberId);
        } catch (Exception e) {
            throw e;
        }
        
    }

    @Transactional
    @Override
    public void returnCoupon(Long memberId, CouponDTO coupon) {
        if (coupon != null) {
            MemberEntity member = memberRepository.findByMemberId(memberId);
            MemberCouponEntity memberCoupon = new MemberCouponEntity();

            memberCoupon.setMember(member);
            memberCoupon.setCouponId(coupon.getCouponId()); // 쿠폰 ID 설정
            memberCoupon.setIssueDate(coupon.getIssueDate());
            memberCoupon.setValidUntil(coupon.getValidUntil());

            memberCouponRepository.save(memberCoupon);
        }
    }
    
    @Transactional
    @Override
    public void createMemberCoupon(Long memberId, Long couponId) {
        // 쿠폰 ID로 해당 쿠폰을 조회합니다.
        CouponEntity coupon = couponRepository.findByCouponId(couponId);
        
        if (coupon == null) {
            throw new IllegalArgumentException("해당 쿠폰을 찾을 수 없습니다. ");
        }

        MemberEntity member = memberRepository.findByMemberId(memberId);
        MemberCouponEntity memberCoupon = new MemberCouponEntity();
            
        memberCoupon.setMember(member);
        memberCoupon.setCouponId(couponId);
        memberCoupon.setIssueDate(new Date());

        if (coupon.getExpirationPeriod() != null) {
            LocalDate currentDate = LocalDate.now();
            LocalDate expirationDate = currentDate.plusMonths(coupon.getExpirationPeriod());
            memberCoupon.setValidUntil(Date.from(expirationDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        } else {
            // 만료 기간이 지정되지 않은 경우 쿠폰의 유효 기간으로 설정
            memberCoupon.setValidUntil(coupon.getValidUntil());
        }

        // 회원 쿠폰 저장
        memberCouponRepository.save(memberCoupon);
    }
   
}