import axios from 'axios';
import { ProductListComp } from 'components/product/ProductListComp';
import React, { useEffect, useState } from 'react';
import { Product } from 'types';
import time from 'assets/time.png'
import hotDeal from 'assets/hotDeal.png'

const TimeLimitedDeals: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [remainingTimes, setRemainingTimes] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/product/timeDeal`;
                const response = await axios.get<Product[]>(url);
                setProducts(response.data.slice(0, 4));
                console.log(response.data)
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // 각 제품의 시작일과 종료일을 가져와서 남은 시간을 계산합니다.
            const remainingTimesArray = products.map((product) => {
                const startDate = new Date(product.startDate);
                const endDate = new Date(product.endDate);
                return calculateRemainingTime(startDate, endDate);
            });
            setRemainingTimes(remainingTimesArray);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [products]);
    
    const calculateRemainingTime = (startDate: Date, endDate: Date): string => {
        const now = new Date();
        const remainingTime = endDate.getTime() - now.getTime();
    
        if (remainingTime <= 0) {
            return '판매 종료'; // 종료된 경우 메시지를 반환하도록 처리
        }
    
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
        return `${hours}시간 ${minutes}분 ${seconds}초`;
    };
    

    return (
        <div className="container mx-auto mt-8">
            <p className='text-4xl font-bold'>💣 타임특가 </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: Product, index) => (
                    <div key={product.productId} className="bg-white rounded-lg shadow-md p-4">
                        <ProductListComp product={product} size='255px' fontSize='7px' />
                        <div className='flex justify-center item-center gap-2'>
                            <img src={time} alt="Time" className="w-8 h-8" />
                            <p className="m-0 text-lg font-bold text-red-600">{remainingTimes[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeLimitedDeals;
