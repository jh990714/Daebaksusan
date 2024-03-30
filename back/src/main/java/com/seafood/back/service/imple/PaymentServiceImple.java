package com.seafood.back.service.imple;


import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.CartDTO;
import com.seafood.back.dto.OptionDTO;
import com.seafood.back.dto.ProductDTO;
import com.seafood.back.entity.OptionEntity;
import com.seafood.back.entity.ProductEntity;
import com.seafood.back.respository.OptionRepository;
import com.seafood.back.respository.ProductRepository;
import com.seafood.back.service.PaymentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImple implements PaymentService{
    
    private final OptionRepository optionRepository;
    private final ProductRepository productRepository;

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
                    throw new RuntimeException("주문 수량이 재고보다 많습니다.");
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

}
