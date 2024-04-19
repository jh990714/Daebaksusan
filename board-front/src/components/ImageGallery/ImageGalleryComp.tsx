import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CustomPrevArrowComp from './CustomPrevArrowComp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ArrowStyles.css'; // ArrowStyles.css 파일 import
import { Product } from 'types';
import { ProductListComp } from 'components/product/ProductListComp';
import { RcmndProductComp } from 'components/product/RcmndProductComp';
import { TimeDealProductComp } from 'components/product/TimeDealProductComp';

interface ImageGalleryProps {
    items: (Product | string)[]; // 상품과 후기 모두를 포함하는 배열
    size?: string;
    fontSize?: string;
    type: 'review' | 'product' | 'rcmn' | 'timeDeal';
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

const ImageGalleryComp: React.FC<ImageGalleryProps> = ({ items, size = "275px", fontSize = "7px", type }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);
    const [rows, setRows] = useState(1);
    

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

    useEffect(() => {
        if (type === 'rcmn') {
            setRows(2);
        } else {
            setRows(1);
        }
    }, [type]);

    const settings = {
        rows: rows,
        centerSlides: false,
        accessibility: true,
        dots: items.length > slidesToShow,
        infinite: true,
        speed: 1000,
        slidesToShow: type === 'rcmn' ? 2 : slidesToShow,
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
                <div key={index} className={`p-1 ${type === 'review' ? 'h-[200px]' : 'h-auto'}`}>
                    {type === 'review' && typeof item === 'string' ? ( // 후기인 경우
                        <img src={`${process.env.PUBLIC_URL}/review/${item}`} alt={`Review ${index}`} className="w-full h-full object-cover rounded-md" />
                    ) : type === 'product' && typeof item !== 'string' ? ( // 상품인 경우
                        <ProductListComp product={item} size={size} fontSize={fontSize} />
                    ) : type === 'rcmn' && typeof item !== 'string' ? ( // 추천 상품인 경우
                        <div className="border border-solid border-gray-300 rounded-md shadow-md">
                            <RcmndProductComp product={item} imgSize_w_per={60} imgSize_h_px={250} font_size={8} border={0} />
                        </div>
                    ) : type === 'timeDeal' && typeof item !== 'string' ? (
                        <TimeDealProductComp product={item}/>
                   ) : null}
                </div>


            ))}
        </Slider>

    );
};

export default ImageGalleryComp;
