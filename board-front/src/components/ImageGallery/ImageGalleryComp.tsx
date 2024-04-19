import React, { useEffect, useState } from 'react';
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
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else if (window.innerWidth < 1280) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(4);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        centerSlides: false,
        accessibility: true,
        dots: items.length > slidesToShow,
        infinite: true,
        speed: 1000,
        slidesToShow: slidesToShow,
        autoplay: items.length > slidesToShow,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        vertical: false,
        swipe: items.length > slidesToShow,
        swipeToSlide: items.length > slidesToShow,
        arrows: items.length > slidesToShow,
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