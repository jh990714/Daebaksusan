import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ProductList } from 'types';

export const MyCartList = () => {
    const [products, setproducts] = useState<ProductList[]>([]);
    const [checkedProducts, setCheckedProducts] = useState<ProductList[]>([]); // 체크된 상품들의 정보를 저장하는 배열

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get<ProductList[]>('http://175.215.44.128:8080/product');
            setproducts(response.data);
            console.log(response);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
        };
    
        fetchData();
    }, []);
    return (
        <div>MyCartList</div>
    )
}
