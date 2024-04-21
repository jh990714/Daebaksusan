import axios from 'axios';
import { ProductListComp } from 'components/product/ProductListComp';
import React, { useEffect, useState } from 'react';
import { Product } from 'types';
import time from 'assets/time.png'
import hotDeal from 'assets/hotDeal.png'
import ImageGalleryComp from 'components/ImageGallery/ImageGalleryComp';
import { TimeDealProductComp } from 'components/product/TimeDealProductComp';

const TimeLimitedDeals: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/product/timeDeal`;
                const response = await axios.get<Product[]>(url);
                setProducts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full my-20 p-3">
            <p className='text-2xl font-bold md:text-4xl'>💣 타임특가 </p>
            <ImageGalleryComp items={products} size='255px' fontSize='7px' component={TimeDealProductComp}/>
        </div>
    );
};

export default TimeLimitedDeals;
