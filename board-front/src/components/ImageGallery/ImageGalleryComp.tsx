import React, { useState } from 'react';
import Slider from 'react-slick';
import CustomPrevArrowComp from './CustomPrevArrowComp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ArrowStyles.css'; // ArrowStyles.css 파일 import

interface ImageGalleryProps {
    imageUrls: string[];
}

function CustomArrow(props: any) {
    const { className, style, onClick } = props;
    console.log(className)
    return (
        <div
            className={`${className}`}
            style={{ ...style, borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

const ImageGalleryComp: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
    
    const settings = {
        centerSlides: false,
        accessibility: true,
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: false,
        swipe: true, // 슬라이드 스와이프 활성화
        swipeToSlide: true,
        arrows: true,
        prevArrow: <CustomArrow />, // 이전 화살표 커스터마이징
        nextArrow: <CustomArrow />, // 다음 화살표 커스터마이징
        
    };

    return (
        <Slider {...settings}>
            {imageUrls.map((imageUrl, index) => (
                <div key={index} className="w-1/4 h-[200px] p-1">
                    <img src={`${process.env.PUBLIC_URL}/review/${imageUrl}`} alt={`Image ${index}`} className="w-full h-full object-cover rounded-md" />
                </div>
            ))}
        </Slider>
    );
};


export default ImageGalleryComp;
