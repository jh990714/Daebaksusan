import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ProductList } from 'types';

interface OrderDetail {
    orderDate: string;
    orderNumber: string;
    orderList: ProductList;
}

export const OrderStatus = () => {
    const[orderStatus, setOrderStatus] = useState<OrderDetail[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.get<OrderDetail[]>('http://175.215.44.128:8080/product');
                setOrderStatus(response.data);

            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);
  
    return (
        <div></div>
    )
}
