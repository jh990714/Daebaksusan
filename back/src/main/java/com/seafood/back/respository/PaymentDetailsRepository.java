package com.seafood.back.respository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.seafood.back.entity.PaymentDetailsEntity;

@Repository
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetailsEntity, Long> {
    @Query(value = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'payment_details' AND table_schema = DATABASE()", nativeQuery = true)
    Long getAutoIncrementId();
    Page<PaymentDetailsEntity> findByMemberIdOrderByPaymentDetailIdDesc(String id, Pageable pageable);
    PaymentDetailsEntity findByMemberIdAndOrderNumber(String id, String orderNumber);
    PaymentDetailsEntity findByOrderNumber(String orderNumber);
    PaymentDetailsEntity findByPasswordAndOrderNumber(String password, String orderNumber);

    @Query("SELECT COUNT(*) FROM PaymentDetailsEntity p WHERE p.orderDate = :date")
    int getOrderCountForDate(@Param("date") Date date);
    
    
}
