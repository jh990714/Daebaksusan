import axios from 'axios';
import { ProductListComp } from 'components/product/ProductListComp';
import React, { useEffect, useState } from 'react';
import { Product } from 'types';
import time from 'assets/time.png'
import hotDeal from 'assets/hotDeal.png'
import ImageGalleryComp from 'components/ImageGallery/ImageGalleryComp';
import { TimeDealProductComp } from 'components/product/TimeDealProductComp';
import { Link } from 'react-router-dom';

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

    if (products.length === 0) {
        return <></>;
    }

    return (
        <div className="w-full my-6 sm:my-8 md:my-8 lg:my-12 xl:16 p-3">
            <Link to={"timeDeal"} className='text-2xl md:text-3xl lg:text-4xl font-bold no-underline text-black dark:text-white'>💣 타임특가 </Link>
            <ImageGalleryComp items={products} size='255px' fontSize='7px' component={TimeDealProductComp}/>
        </div>
    );
};

export default TimeLimitedDeals;
