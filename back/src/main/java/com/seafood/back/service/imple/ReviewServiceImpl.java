package com.seafood.back.service.imple;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.ReviewDTO;
import com.seafood.back.dto.ReviewResponseDTO;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.entity.ReviewEntity;
import com.seafood.back.entity.ReviewImageEntity;
import com.seafood.back.entity.ReviewResponseEntity;
import com.seafood.back.respository.MemberRepository;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.respository.ReviewImageRepository;
import com.seafood.back.respository.ReviewRepository;
import com.seafood.back.respository.ReviewResponseRepository;
import com.seafood.back.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final OptionRepository optionRepository;
    private final ReviewImageRepository reviewImageRepository;
    private final ReviewResponseRepository reviewResponseRepository;

    @Override
    public List<ReviewDTO> findReviews(Integer productId) {
        List<ReviewDTO> reviewDTOs = new ArrayList<>();
        
        List<ReviewEntity> reviewEntities = new ArrayList<ReviewEntity>();

        reviewEntities = reviewRepository.findByProductId(productId);
        
        for(ReviewEntity reviewEntity : reviewEntities ) {
            ReviewDTO reviewDTO = new ReviewDTO();

            reviewDTO.setContents(reviewEntity.getContents());
            reviewDTO.setScore(reviewEntity.getScore());
            reviewDTO.setReviewDate(reviewEntity.getReviewDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
            reviewDTO.setIsBest(reviewEntity.getIsBest());

            int memberId = reviewEntity.getMemberId();
            log.info("memberId" + memberId);
            MemberEntity memberEntity = memberRepository.findByMemberId(memberId);
            reviewDTO.setName(memberEntity.getName());

            ProductEntity productEntity = productRepository.findByProductId(productId);
            reviewDTO.setProductName(productEntity.getName());

            int optionId = reviewEntity.getOptionId();
            log.info("optionId" + optionId);

            OptionEntity optionEntity = optionRepository.findByOptionId(optionId);
            reviewDTO.setOptionName(optionEntity.getName());

            int reviewId = reviewEntity.getReviewId();
            log.info("reviewId" + reviewId);

            List<ReviewImageEntity> reviewImageEntities = reviewImageRepository.findByReviewId(reviewId);
            List<String> imageUrls = new ArrayList<String>();
            for(ReviewImageEntity reviewImageEntity: reviewImageEntities){
                imageUrls.add(reviewImageEntity.getImageUrl());
            }
            reviewDTO.setImageUrls(imageUrls);

            
            List<ReviewResponseDTO> reviewResponseDTOs = new ArrayList<ReviewResponseDTO>();
            List<ReviewResponseEntity> reviewResponseEntities = reviewResponseRepository.findByReviewId(reviewId);
            for(ReviewResponseEntity reviewResponseEntity: reviewResponseEntities){
                ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();

                int adminId = reviewResponseEntity.getAdminId();
                reviewResponseDTO.setName(memberRepository.findByMemberId(adminId).getName());
                reviewResponseDTO.setResponseText(reviewResponseEntity.getResponseText());
                reviewResponseDTO.setResponseDate(reviewResponseEntity.getResponseDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));

                reviewResponseDTOs.add(reviewResponseDTO);
            }
            reviewDTO.setResponses(reviewResponseDTOs);

            

            reviewDTOs.add(reviewDTO);
        }

        

        return reviewDTOs;
    }
    
}