import { Product } from 'types';
import styles from './RcmndProductComp.module.css';
import tag from 'assets/bestProductIcon.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface RcmndProductCompProps {
    product: Product;
    imgSize_w_per?: number; // 옵션: 이미지 컨테이너 너비 (퍼센트)
    imgSize_h_px?: string; // 옵션: 이미지 컨테이너 높이 (픽셀)
    fontSize: string;
    radius?: number;
    shadow?: boolean;
}

export const RcmndProductComp: React.FC<RcmndProductCompProps> = ({
    product,
    imgSize_w_per =50,
    fontSize,
    radius = 3,
    shadow = false,
}) => {
    
    return (
        <Link
            to={`/detail/${product.productId}`}
            className="block no-underline text-black"
        >
            <div className={`relative flex flex-col lg:flex-row bg-white ${shadow ? 'shadow-md' : ''} w-full rounded-lg`}>
                {/* 상품 이미지 영역 */}
                <div className={`h-1/2 lg:w-[${imgSize_w_per}%]`}>
                    <img src={`${product.imageUrl}`} className={`object-cover rounded-[${radius}%]`} />
                </div>
                {/* 상품 설명 영역 */}
                <div className={`h-1/2 lg:w-[${100 - imgSize_w_per}%] flex flex-col justify-center p-4`}>
                    <p className={`text-xs 2xl:text-[${fontSize}px] font-semibold truncate no-underline text-black`}>
                        {product.name}
                    </p>
                    <p className="text-xs line-through text-gray-400">
                        {product.regularPrice.toLocaleString()}원
                    </p>
                    <p className={`text-sm 2xl:text-[${fontSize}px] text-black font-bold no-underline`}>
                        {(product.regularPrice - product.salePrice).toLocaleString()}원
                    </p>
                </div>
            </div>
        </Link>
    );
};