package com.seafood.back.service.imple;

import java.math.BigDecimal;

import java.util.List;
import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.seafood.back.entity.PointsDetailsEntity;
import com.seafood.back.respository.PointsTransactionRepository;
import com.seafood.back.service.PointsTransactionService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PointsTransactionServiceImple implements PointsTransactionService{

    private final PointsTransactionRepository pointsTransactionRepository;
    
    @Override
    public Page<PointsDetailsEntity> getAllTransactions(String memberId, int page, int size) {

        Pageable pageable = PageRequest.of(page - 1, size);

        Page<PointsDetailsEntity> pointsDetailsPage = pointsTransactionRepository.findByMemberIdOrderByPtIdDesc(memberId, pageable);
        return pointsDetailsPage;
    }

    @Transactional
    @Override
    public PointsDetailsEntity createTransaction(String memberId, String description, BigDecimal usageAmount, BigDecimal subTotal) {
        PointsDetailsEntity transactionEntity = new PointsDetailsEntity();
        transactionEntity.setMemberId(memberId);
        transactionEntity.setDate(new Date());
        transactionEntity.setDescription(description);
        transactionEntity.setUsageAmount(usageAmount);
        transactionEntity.setSubTotal(subTotal);

        return pointsTransactionRepository.save(transactionEntity); // 적립금 거래 내역 저장 후 반환
    }
    
}
