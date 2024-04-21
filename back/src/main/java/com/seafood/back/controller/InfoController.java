package com.seafood.back.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seafood.back.dto.MemberDTO;
import com.seafood.back.dto.PaymentDetailDTO;
import com.seafood.back.dto.ReviewCriteriaDTO;
import com.seafood.back.dto.ReviewDTO;
import com.seafood.back.service.InfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/info")
public class InfoController {

    private final InfoService infoService;

    @GetMapping
    public ResponseEntity<MemberDTO> myPage(Authentication authentication) {
        String id = authentication.getName();
        MemberDTO userInfo = infoService.getUserInfo(id);

        return ResponseEntity.ok().body(userInfo);
    }

    @GetMapping("/orderDetails")
    public ResponseEntity<?> getOrderDetails(Authentication authentication,
                                               @RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int pageSize) {
        try {
            String id = authentication.getName();
            Page<PaymentDetailDTO> paymentDetails = infoService.getOrdertDetails(id, page, pageSize);
            return ResponseEntity.ok().body(paymentDetails);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패");
        }
    }
    @PostMapping("/reviewSave")
    public ResponseEntity<?> saveReview(Authentication authentication,
                                        @RequestParam("orderNumber") String orderNumber,
                                        @RequestParam("productId") Integer productId,
                                        @RequestParam(name = "optionId", required = false) Integer optionId,
                                        @RequestParam("contents") String contents,
                                        @RequestParam("score") Integer score,
                                        @RequestParam(value = "imageFiles", required = false) MultipartFile[] imageFiles)
{
        try {
            String id = authentication.getName();
            infoService.saveReview(id, orderNumber, productId, optionId, contents, score, imageFiles);
    
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패");
        }
    }
    
    @PostMapping("/reviews")
    public ResponseEntity<?> getReviews(Authentication authentication,
                                        @RequestBody ReviewCriteriaDTO reviewCriteriaDTO) {
        try {
            String id = authentication.getName();
            log.info(reviewCriteriaDTO.getOrderNumber());
            ReviewDTO reviewDTO = infoService.getReviews(id, reviewCriteriaDTO);
            return ResponseEntity.ok().body(reviewDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패");
        }
    }

}
