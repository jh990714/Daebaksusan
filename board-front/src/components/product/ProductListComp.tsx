import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types';
import bestProductIcon from 'assets/bestProductIcon.png';

interface ProductListCompProps {
    product: Product;
    size: string;
    fontSize: string;
}

export const ProductListComp: React.FC<ProductListCompProps> = ({ product, size, fontSize }) => {
    const discountRate = Math.round((product.salePrice / product.regularPrice) * 100);

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
                <div className="w-full max-w-[300px] mt-4">
                    <hr className="my-2 border-gray-300" />
                    <div>
                        <p className="text-xs md:text-sm lg:text-base 2xl:text-lg font-bold truncate">
                            {product.salePrice !== 0 && (
                                <span className="text-xs md:text-sm bg-blue-500 text-white rounded px-2 py-1 text-xs mr-2">
                                    {discountRate.toFixed(0)}%
                                </span>
                            )}
                            {product.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 truncate">
                            {product.description || '\u00A0'}
                        </p>
                        <div className="flex items-end mt-2">
                            <p className="text-xs md:text-sm lg:text-base 2xl:text-lg font-bold">
                                {(product.regularPrice - product.salePrice).toLocaleString()}원
                            </p>
                            {product.salePrice !== 0 && (
                                <p className="text-xs md:text-sm text-gray-500 line-through ml-2">
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
