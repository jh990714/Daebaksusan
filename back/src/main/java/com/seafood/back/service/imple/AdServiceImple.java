package com.seafood.back.service.imple;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.seafood.back.dto.AdDTO;
import com.seafood.back.entity.AdEntity;
import com.seafood.back.repository.AdRepository;
import com.seafood.back.service.AdService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdServiceImple implements AdService {

     private final AdRepository adRepository;

    @Override
    public List<AdDTO> getAds() {
        LocalDate currentDate = LocalDate.now();
        List<AdEntity> ads = adRepository.findActiveAds(currentDate);

        return ads.stream()
                  .map(AdDTO::fromEntity)
                  .collect(Collectors.toList());
    }
    
}
