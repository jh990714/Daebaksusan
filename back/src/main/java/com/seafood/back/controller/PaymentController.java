// package com.seafood.back.controller;

// import java.io.IOException;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.siot.IamportRestClient.IamportClient;
// import com.siot.IamportRestClient.exception.IamportResponseException;
// import com.siot.IamportRestClient.response.IamportResponse;
// import com.siot.IamportRestClient.response.Payment;

// @RestController
// public class PaymentController {

//     private final IamportClient iamportClient;

//     public PaymentController(@Value("${iamport.key}") String restApiKey, @Value("${iamport.secret}") String restApiSecret) {
//         this.iamportClient = new IamportClient(restApiKey, restApiSecret);
//     }

//     @PostMapping("/verifyIamport/{imp_uid}")
//     public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String imp_uid) {
//         try {
//             return iamportClient.paymentByImpUid(imp_uid);
//         } catch (IamportResponseException | IOException e) {
//             // 예외 처리
//             e.printStackTrace(); // 적절한 로깅 추가
//             return null; // 또는 적절한 에러 응답을 반환
//         }
//     }
// }
