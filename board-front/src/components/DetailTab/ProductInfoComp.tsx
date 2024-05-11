import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface ProductInfoCompProps {
    productId: number;
}
export const ProductInfoComp: React.FC<ProductInfoCompProps> = ({ productId }) => {
    const [productInfo, setProductInfo] = useState<string>('');

    useEffect(() => {
        const fetchProductinfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/productInfo?productId=${productId}`);


                setProductInfo(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchProductinfo();
    }, [productId]);
    return (
        <img src={productInfo} alt="상품정보" />
    )
}