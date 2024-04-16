import React, { useState } from 'react';
import Slider from 'react-slick';
import CustomPrevArrowComp from './CustomPrevArrowComp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ArrowStyles.css'; // ArrowStyles.css 파일 import
import { Product } from 'types';
import { ProductListComp } from 'components/product/ProductListComp';



interface ImageGalleryProps {
    items: (Product | string)[]; // 상품과 후기 모두를 포함하는 배열
    size?: string;
    fontSize?: string;
}

function CustomArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}`}
            style={{ ...style, borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

const ImageGalleryComp: React.FC<ImageGalleryProps> = ({ items, size="275px", fontSize="7px" }) => {

    const settings = {
        centerSlides: false,
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: false,
        swipe: true,
        swipeToSlide: true,
        arrows: true,
        prevArrow: <CustomArrow />,
        nextArrow: <CustomArrow />,
    };
    
    return (
        <Slider {...settings}>
            {items.map((item, index) => (
                <div key={index} className={`w-1/4 p-1 ${typeof item === 'string' ? 'h-[200px]' : 'h-auto'}`}>
                    {typeof item === 'string' ? ( // 후기인 경우
                        <img src={`${process.env.PUBLIC_URL}/review/${item}`} alt={`Review ${index}`} className="w-full h-full object-cover rounded-md" />
                    ) : ( // 상품인 경우
                            <ProductListComp product={item} size={size} fontSize={fontSize} />
                    )}
                </div>
            ))}
        </Slider>
    );
};

export default ImageGalleryComp;