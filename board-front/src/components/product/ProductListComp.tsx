import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types';
import bestProductIcon from 'assets/bestProductIcon.png';

interface ProductListCompProps {
    product: Product;
    size?: string;
    fontSize?: string; // fontSize를 선택적으로 받음
}

export const ProductListComp: React.FC<ProductListCompProps> = ({ product, size, fontSize }) => {
    const discountRate = Math.round((product.salePrice / product.regularPrice) * 100);

    // 기본 fontSize가 설정되지 않으면 기본 값 사용
    const nameFontSize = fontSize || 'text-xs md:text-sm lg:text-base 2xl:text-lg';
    const descriptionFontSize = fontSize || 'text-xs md:text-sm';
    const priceFontSize = fontSize || 'text-xs md:text-sm lg:text-base 2xl:text-lg';
    const regularPriceFontSize = fontSize || 'text-xs md:text-sm';

    return (
        <Link
            to={`/detail/${product.productId}`}
            className="block text-start text-inherit no-underline hover:text-inherit"
        >
            <div className="flex flex-col items-center w-full hover:scale-105 transition-transform overflow-hidden">
                {/* 이미지 섹션 */}
                <div className="relative w-full h-auto">
                    {product.recommended && (
                        <img
                            src={bestProductIcon}
                            alt="추천 아이콘"
                            className="absolute top-2 left-2 w-10"
                        />
                    )}
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-w-[300px] h-auto object-cover rounded-lg"
                    />
                </div>

                {/* 설명 섹션 */}
                <div className="w-full max-w-[300px]">
                    <hr className="my-2 border-gray-300" />
                    <div>
                        <p className={`${nameFontSize} font-bold truncate m-0`}>
                            {product.salePrice !== 0 && (
                                <span className={`${nameFontSize} bg-blue-500 text-white rounded px-2 py-1 text-xs mr-2`}>
                                    {discountRate.toFixed(0)}%
                                </span>
                            )}
                            {product.name}
                        </p>
                        <p className={`${descriptionFontSize} truncate m-0  text-gray-500`}>
                            {product.description || '\u00A0'}
                        </p>
                        <div className="flex items-end mt-1">
                            <p className={`${priceFontSize} font-bold m-0`}>
                                {(product.regularPrice - product.salePrice).toLocaleString()}원
                            </p>
                            {product.salePrice !== 0 && (
                                <p className={`${regularPriceFontSize} mb-0 ml-2 text-gray-500 line-through`}>
                                    {product.regularPrice.toLocaleString()}원
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
