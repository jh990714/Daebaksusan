package com.seafood.back.service.imple;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.PaymentDetailsEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.PaymentDetailsRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.CartService;
import com.seafood.back.service.PaymentService;
import com.seafood.back.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImple implements PaymentService{
    
    private final ProductService productService;
    private final CartService cartService;

    private final OptionRepository optionRepository;
    private final ProductRepository productRepository;
    private final PaymentDetailsRepository paymentDetailsRepository;

    @Transactional
    @Override
    public BigDecimal orderAmount(List<CartDTO> orderItems) {
        BigDecimal sum = BigDecimal.ZERO;
        for (CartDTO orderItem: orderItems) {
            int productId = orderItem.getProduct().getProductId(); // 상품 ID
            int optionId = orderItem.getOption().getOptionId(); // 옵션 ID

            // 상품과 옵션을 조회합니다.
            Optional<ProductEntity> productOptional = productRepository.findById(productId);
            Optional<OptionEntity> optionOptional = optionRepository.findById(optionId);

            // 상품과 옵션 정보가 존재할 경우, 가격을 더합니다.
            if (productOptional.isPresent() && optionOptional.isPresent()) {
                
                ProductEntity product = productOptional.get();
                OptionEntity option = optionOptional.get();

                // 주문된 상품의 수량체크
                int orderedQuantity = orderItem.getQuantity();
                int remainingStock = product.getStockQuantity() - orderedQuantity;
                
                if (remainingStock < 0) {
                    throw new IllegalArgumentException("주문 수량이 재고보다 많습니다. 상품명: " + product.getName());
                }

                BigDecimal productPrice = product.getRegularPrice().subtract(product.getSalePrice());
                BigDecimal shippingCost = product.getShippingCost();
                int maxQuantityPerDelivery = product.getMaxQuantityPerDelivery();

                BigDecimal optionPrice = option.getAddPrice();
                int quantity = orderItem.getQuantity();
                int boxCnt = (int) Math.ceil((double)quantity / maxQuantityPerDelivery);
                
                BigDecimal productTotalPrice = productPrice.multiply(new BigDecimal(quantity));
                BigDecimal optionTotalPrice = optionPrice.add(shippingCost).multiply(new BigDecimal(boxCnt));
    

                sum = sum.add(productTotalPrice.add(optionTotalPrice));
            }

        }
        return sum;
    }

    @Transactional
    @Override
    public String savePaymentDetails(String id, String impUid) {
        PaymentDetailsEntity paymentDetails = new PaymentDetailsEntity();

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String currentTime = now.format(formatter);
        
        // auto_increment의 id 값 가져오기
        Long autoIncrementId = paymentDetailsRepository.getAutoIncrementId();
        
        // 현재 시간과 auto_increment id를 조합하여 16자리의 사용자 ID 생성
        String orderNumber = currentTime + '_' + String.format("%08d", autoIncrementId);
        
        if (id != null) {
            paymentDetails.setMemberId(id);
        }
        
        paymentDetails.setOrderNumber(orderNumber);
        paymentDetails.setImpUid(impUid);
        paymentDetailsRepository.save(paymentDetails);

        return orderNumber;
    }

    @Override
    public String processSuccessfulPayment(String id, List<CartDTO> orderItems, String impUid) {
        // 결제가 성공하면 상품 수량 변경
        productService.updateProductQuantities(orderItems);

        // 결제가 성공하면 카트 아이템 삭제
        if (id != null) {
            List<Long> cartItemIdsToDelete = orderItems.stream()
                                                        .map(CartDTO::getCartId)
                                                        .collect(Collectors.toList());
        
            cartService.deleteSelectedCartItems(id, cartItemIdsToDelete);
        }
        // 결제 정보 저장
        String orderNumber = savePaymentDetails(id, impUid);

        return orderNumber;
    }

}
