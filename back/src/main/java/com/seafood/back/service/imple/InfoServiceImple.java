package com.seafood.back.service.imple;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seafood.back.dto.CouponDTO;
import com.seafood.back.dto.MemberDTO;
import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.dto.PaymentItemDTO;
import com.seafood.back.dto.ReviewCriteriaDTO;
import com.seafood.back.dto.ReviewDTO;

import com.seafood.back.dto.ReviewResponseDTO;

import com.seafood.back.entity.MemberEntity;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.PaymentDetailsEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.entity.ReviewEntity;
import com.seafood.back.entity.ReviewImageEntity;
import com.seafood.back.entity.ReviewResponseEntity;

import com.seafood.back.respository.MemberRepository;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.PaymentDetailsRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.respository.ReviewImageRepository;
import com.seafood.back.respository.ReviewRepository;
import com.seafood.back.respository.ReviewResponseRepository;
import com.seafood.back.service.CouponService;
import com.seafood.back.service.InfoService;
import com.seafood.back.service.MemberService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class InfoServiceImple implements InfoService {
    
    private final MemberService memberService;

    private final MemberRepository memberRepository;
    private final PaymentDetailsRepository paymentDetailsRepository;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final OptionRepository optionRepository;
    private final ReviewImageRepository reviewImageRepository;
    private final ReviewResponseRepository reviewResponseRepository;

    private final IamportClient iamportClient;

    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberDTO getUserInfo(String id) {
        MemberDTO memberDto = memberService.getMemberInfo(id);

        return memberDto;
    }

    @Override
    public Page<PaymentDetailDTO> getOrdertDetails(String id, int page, int size) {
        // 페이지 번호를 0부터 시작하도록 수정
        Pageable pageable = PageRequest.of(page - 1, size);

        // 페이지네이션된 데이터를 가져옴
        Page<PaymentDetailsEntity> paymentDetailsPage = paymentDetailsRepository
                .findByMemberIdOrderByPaymentDetailIdDesc(id, pageable);

        // PaymentDetailDTO 리스트를 담을 리스트 생성
        List<PaymentDetailDTO> paymentDetailDTOs = new ArrayList<>();

        // 페이지네이션된 데이터를 PaymentDetailDTO로 변환하여 리스트에 추가
        for (PaymentDetailsEntity paymentDetail : paymentDetailsPage.getContent()) {
            try {
                PaymentDetailDTO paymentDetailDTO = new PaymentDetailDTO();

                IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(paymentDetail.getImpUid());

                List<PaymentItemDTO> orderItems = extractOrderItems(iamportResponse);

                // for (PaymentItemDTO item : orderItems) {
                // item.setIsReview(true);
                // }

                for (PaymentItemDTO item : orderItems) {
                    boolean isReview = reviewRepository.existsByProductIdAndOptionIdAndMemberIdAndOrderNumber(
                            item.getProduct().getProductId(), item.getOption().getOptionId(), id,
                            paymentDetail.getOrderNumber());

                    item.setIsReview(isReview);
                }

                paymentDetailDTO.setOrderNumber(paymentDetail.getOrderNumber());
                paymentDetailDTO.setOrderItems(orderItems);
                if (iamportResponse.getResponse().getStatus().equals("cancelled")) {
                    paymentDetailDTO.setCancel(true);
                }

                paymentDetailDTOs.add(paymentDetailDTO);
            } catch (IamportResponseException | IOException e) {
                // 예외 발생 시 처리
                e.printStackTrace();
            }
        }

        return new PageImpl<>(paymentDetailDTOs, pageable, paymentDetailsPage.getTotalElements());
    }

    @Override
    public List<PaymentDetailDTO> getPaymentByOrderNumberAndPassword(String orderNumber, String password) {
        PaymentDetailsEntity paymentDetail = paymentDetailsRepository.findByOrderNumber(orderNumber);

        if (paymentDetail == null || paymentDetail.getMemberId() != null
                || !passwordEncoder.matches(password, paymentDetail.getPassword())) {
            throw new RuntimeException("주문 정보를 찾을 수 없습니다.");
        }

        List<PaymentDetailDTO> paymentDetailDTOs = new ArrayList<>();

        try {
            PaymentDetailDTO paymentDetailDTO = new PaymentDetailDTO();

            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(paymentDetail.getImpUid());

            List<PaymentItemDTO> orderItems = extractOrderItems(iamportResponse);

            paymentDetailDTO.setOrderNumber(paymentDetail.getOrderNumber());
            paymentDetailDTO.setOrderItems(orderItems);
            if (iamportResponse.getResponse().getStatus().equals("cancelled")) {
                paymentDetailDTO.setCancel(true);
            }

            paymentDetailDTOs.add(paymentDetailDTO);

            return paymentDetailDTOs;
        } catch (IamportResponseException | IOException e) {
            // 예외 발생 시 처리
            e.printStackTrace();
        }
        return null;

    }

    private List<PaymentItemDTO> extractOrderItems(IamportResponse<Payment> iamportResponse)
            throws IamportResponseException, IOException {

        // JSON 문자열 파싱하여 Map 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = objectMapper.readValue(iamportResponse.getResponse().getCustomData(),
                new TypeReference<Map<String, Object>>() {
                });

        List<PaymentItemDTO> orderItems = objectMapper.convertValue(jsonMap.get("orderItems"),
                new TypeReference<List<PaymentItemDTO>>() {
                });
                

        return orderItems;
    }



    @Transactional
    public void saveReview(String id, String orderNumber, Integer productId, Integer optionId, String contents, Integer score,
            MultipartFile[] imageFiles) {
        ReviewEntity reviewEntity = new ReviewEntity();
        reviewEntity.setMemberId(id);
        reviewEntity.setOrderNumber(orderNumber);
        reviewEntity.setProductId(productId);
        reviewEntity.setOptionId(optionId);
        reviewEntity.setContents(contents);
        reviewEntity.setScore(score);
        reviewEntity.setReviewDate(LocalDateTime.now());
        reviewEntity.setIsBest(false); // 기본값으로 false 설정

        ReviewEntity savedReviewEntity = reviewRepository.save(reviewEntity);

        if (imageFiles != null) { // null 체크 추가
            for (MultipartFile imageFile : imageFiles) {
                if (imageFile != null && !imageFile.isEmpty()) { // null 및 비어있는지 체크
                    ReviewImageEntity reviewImageEntity = new ReviewImageEntity();
                    reviewImageEntity.setReviewId(savedReviewEntity.getReviewId());
                    // 이미지 파일 저장 코드 추가
                    String imageUrl;
                    try {
                        imageUrl = saveImage(imageFile);
                        reviewImageEntity.setImageUrl(imageUrl);
                        reviewImageRepository.save(reviewImageEntity);
                    } catch (IOException e) {

                        e.printStackTrace();
                    }

                }
            }
        }
    }

    private String saveImage(MultipartFile imageFile) throws IOException {
        String oriFileName = StringUtils.cleanPath(imageFile.getOriginalFilename());

        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = oriFileName + "_" + timeStamp + ".jpg"; // 예시로 "image_20220419_123456.jpg" 형식으로 생성합니다.
        Path uploadDir = Paths.get("C:\\Users\\jang\\Desktop\\Seafood_WebSite\\Jang\\board-front\\public\\review");

        // 업로드 디렉토리가 존재하지 않으면 생성합니다.
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // 파일을 업로드 디렉토리에 저장합니다.
        try {
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath);
            return fileName;
        } catch (IOException ex) {
            throw new IOException("이미지를 저장하는 중에 오류가 발생했습니다.", ex);
        }
    }

    @Override
    public ReviewDTO getReviews(String id, ReviewCriteriaDTO reviewCriteriaDTO) {
        ReviewEntity reviewEntity = reviewRepository.findByProductIdAndOptionIdAndMemberIdAndOrderNumber(
            reviewCriteriaDTO.getProductId(), reviewCriteriaDTO.getOptionId(), id, reviewCriteriaDTO.getOrderNumber());

        ReviewDTO reviewDTO = new ReviewDTO();

        log.info(reviewEntity.getReviewId().toString());
        reviewDTO.setContents(reviewEntity.getContents());
        reviewDTO.setScore(reviewEntity.getScore());
        reviewDTO.setReviewDate(reviewEntity.getReviewDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        reviewDTO.setIsBest(reviewEntity.getIsBest());

        String memberId = reviewEntity.getMemberId();
        MemberEntity memberEntity = memberRepository.findById(memberId);
        reviewDTO.setName(memberEntity.getName());

        ProductEntity productEntity = productRepository.findByProductId(reviewEntity.getProductId());
        reviewDTO.setProductName(productEntity.getName());

        int optionId = reviewEntity.getOptionId();

        OptionEntity optionEntity = optionRepository.findByOptionId(optionId);
        reviewDTO.setOptionName(optionEntity.getName());

        int reviewId = reviewEntity.getReviewId();

        List<ReviewImageEntity> reviewImageEntities = reviewImageRepository.findByReviewId(reviewId);
        List<String> imageUrls = new ArrayList<String>();
        for (ReviewImageEntity reviewImageEntity : reviewImageEntities) {
            imageUrls.add(reviewImageEntity.getImageUrl());
        }
        reviewDTO.setImageUrls(imageUrls);

        List<ReviewResponseDTO> reviewResponseDTOs = new ArrayList<ReviewResponseDTO>();
        List<ReviewResponseEntity> reviewResponseEntities = reviewResponseRepository.findByReviewId(reviewId);
        for (ReviewResponseEntity reviewResponseEntity : reviewResponseEntities) {
            ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();

            int adminId = reviewResponseEntity.getAdminId();
            reviewResponseDTO.setName(memberRepository.findByMemberId(adminId).getName());
            reviewResponseDTO.setResponseText(reviewResponseEntity.getResponseText());
            reviewResponseDTO.setResponseDate(
                    reviewResponseEntity.getResponseDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));

            reviewResponseDTOs.add(reviewResponseDTO);
        }
        reviewDTO.setResponses(reviewResponseDTOs);

        return reviewDTO;
    }
}