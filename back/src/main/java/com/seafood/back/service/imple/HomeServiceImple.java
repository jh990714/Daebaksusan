package com.seafood.back.service.imple;

import java.io.IOException;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.seafood.back.dto.ProductDTO;
import com.seafood.back.dto.VideoDTO;
import com.seafood.back.entity.CarouselEntity;
import com.seafood.back.entity.VideoEntity;
import com.seafood.back.respository.CarouselsRepository;
import com.seafood.back.respository.VideoRepository;
import com.seafood.back.service.HomeService;
import com.seafood.back.service.ProductService;
import com.seafood.back.service.S3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class HomeServiceImple implements HomeService {

    private final ProductService productService;
    private final S3Service s3Service;

    private final CarouselsRepository carouselsRepository;
    private final VideoRepository videoRepository;

    
    @Override
    @Cacheable(value = "carouselCache")
    public List<CarouselEntity> getCarouselImageUrls() {
        log.info("getCarsosel");
        List<CarouselEntity> carousels = carouselsRepository.findAll();

        carousels.forEach(carousel -> {
            try {
                String imageUrl = s3Service.getImageUrl(carousel.getImageUrl());
                carousel.setImageUrl(imageUrl);
            } catch (IOException e) {
        
                e.printStackTrace();
            }
        });

        return carousels;
    }

    @Override
    public VideoDTO getVideoPlayer() {
        VideoEntity video = videoRepository.findFirstByOrderByVideoId();
        List<ProductDTO> productDTOs = productService.findProductNew();

        VideoDTO videoDTO = new VideoDTO();

        if (video != null) {
            String videoUrl;
            try {
                videoUrl = s3Service.getImageUrl(video.getVideoUrl());
                videoDTO.setVideoId(video.getVideoId());
                videoDTO.setVideoUrl(videoUrl);
            } catch (IOException e) {
            
                e.printStackTrace();
            }

           
        }

        if (productDTOs != null) {
            videoDTO.setProducts(productDTOs);
        }

        return videoDTO;
    }

}
