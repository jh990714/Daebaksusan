package com.seafood.back.service.imple;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seafood.back.dto.CouponDTO;
import com.seafood.back.dto.MemberDTO;
import com.seafood.back.dto.MemberUpdateDTO;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.entity.MemberPointsEntity;
import com.seafood.back.respository.MemberPointsRepository;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.service.CouponService;
import com.seafood.back.service.MemberService;
import com.seafood.back.utils.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImple implements MemberService {

    private final CouponService couponService;

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberPointsRepository memberPointsRepository;

    @Value("${jwt.secret}")
    private String accessSecretKey;

    @Value("${jwt.refersh}")
    private String refreshSecretKey;

    private Long accessTokenExpiredMs = (long) (1000 * 60 * 30); // 액세스 토큰 만료 시간 (30분)
    private Long refreshTokenExpiredMs = (long) (1000 * 60 * 60 * 24 * 7); // 리프레시 토큰 만료 시간 (7일)

    @Override
    public String getAccessToken(String userName) {
        return JwtUtil.createJwt(userName, accessSecretKey, accessTokenExpiredMs);
    }

    @Override
    public String getRefreshToken(String userName) {
        return JwtUtil.createJwt(userName, refreshSecretKey, refreshTokenExpiredMs);
    }

    @Override
    public boolean authenticateMember(String memberId, String password) {
        MemberEntity user = memberRepository.findById(memberId);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return false;
        }
        return true;

    }

    @Transactional
    @Override
    public MemberEntity registerNewMember(MemberEntity member) {
        try {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
            member.setRole("ROLE_USER");
            member.setType("sign");

            MemberEntity savedMember = memberRepository.save(member);

            // 회원 포인트 정보 생성 및 저장
            MemberPointsEntity memberPoints = new MemberPointsEntity();
            memberPoints.setMemberId(savedMember.getId());
            memberPoints.setPoints(BigDecimal.ZERO); // 초기 포인트는 0으로 설정
            memberPointsRepository.save(memberPoints);

            return savedMember;
        } catch (DataIntegrityViolationException e) {
            // 중복된 아이디가 있을 경우에 대한 예외 처리
            throw new DataIntegrityViolationException("중복된 아이디입니다.");
        } catch (Exception e) {
            // 그 외 예외에 대한 예외 처리
            throw new RuntimeException("회원 가입 중 오류가 발생했습니다.", e);
        }
    }

    @Override
    public MemberDTO getMemberInfo(String id) {
        MemberEntity member = memberRepository.findById(id);
        MemberDTO memberDto = new MemberDTO();

        memberDto.setMemberId(member.getMemberId());
        memberDto.setId(member.getId());
        memberDto.setName(member.getName());
        memberDto.setPhone(member.getPhone());
        memberDto.setEmail(member.getEmail());
        memberDto.setPostalCode(member.getPostalCode());
        memberDto.setAddress(member.getAddress());
        memberDto.setDetailAddress(member.getDetailAddress());

        MemberPointsEntity memberPoints = memberPointsRepository.findByMemberId(id);
        if (memberPoints != null) {
            memberDto.setPoints(memberPoints.getPoints());
        } else {
            memberDto.setPoints(BigDecimal.ZERO);
        }

        List<CouponDTO> couponDTOs = couponService.mapCouponsToDTOs(id);
        memberDto.setCoupons(couponDTOs);

        return memberDto;
    }

    @Override
    public BigDecimal getAvailablePoints(String id) {
        MemberPointsEntity memberPoints = memberPointsRepository.findByMemberId(id);
        return memberPoints != null ? memberPoints.getPoints() : BigDecimal.ZERO;
    }

    @Override
    public BigDecimal deductPoints(String id, BigDecimal points) {
        // 회원의 포인트 정보 조회
        MemberPointsEntity memberPoints = memberPointsRepository.findByMemberId(id);

        if (memberPoints != null) {
            BigDecimal currentPoints = memberPoints.getPoints();
            BigDecimal updatedPoints = currentPoints.subtract(points);
            if (updatedPoints.compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("차감할 포인트보다 회원의 보유 포인트가 적습니다.");
            }

            memberPoints.setPoints(updatedPoints);
            memberPointsRepository.save(memberPoints);

            return memberPoints.getPoints();
        } else {
            throw new IllegalArgumentException("해당 회원의 포인트 정보가 없습니다.");
        }
    }

    @Override
    public void updateMember(MemberUpdateDTO memberUpdateDTO) {
        MemberEntity member = memberRepository.findById(memberUpdateDTO.getId());

        if (member == null) {
            throw new IllegalArgumentException("해당 ID를 가진 회원이 없습니다.");
        }

        if (memberUpdateDTO.getCurrentPassword() != null && !memberUpdateDTO.getCurrentPassword().isEmpty()) {

            if (!passwordEncoder.matches(memberUpdateDTO.getCurrentPassword(), member.getPassword())){
                throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
            }
        }

        if (memberUpdateDTO.getPassword() != null && !memberUpdateDTO.getPassword().isEmpty()) {
            member.setPassword(passwordEncoder.encode(memberUpdateDTO.getPassword()));
        }

        if (memberUpdateDTO.getEmail() != null) {
            member.setEmail(memberUpdateDTO.getEmail());
        }

        if (memberUpdateDTO.getPostalCode() != null) {
            member.setPostalCode(memberUpdateDTO.getPostalCode());
        }
        if (memberUpdateDTO.getAddress() != null) {
            member.setAddress(memberUpdateDTO.getAddress());
        }
        if (memberUpdateDTO.getDetailAddress() != null) {
            member.setDetailAddress(memberUpdateDTO.getDetailAddress());
        }

        memberRepository.save(member);
    }

}
