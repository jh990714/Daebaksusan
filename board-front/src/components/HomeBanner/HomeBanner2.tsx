import React, { useEffect, useState } from 'react';
import { RcmndProductComp } from 'components/product/RcmndProductComp';
import axios, { AxiosResponse } from 'axios';
import { Product } from 'types';
import ImageGalleryComp from 'components/ImageGallery/ImageGalleryComp';
import { Link } from 'react-router-dom';

export const HomeBanner2 = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Product[]> = await axios.get<Product[]>(`${process.env.REACT_APP_API_URL}/product/recommend`);
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full my-6 sm:my-8 md:my-8 lg:my-12 xl:16 p-3'>
      <Link to={"recommend"} className='text-2xl md:text-3xl lg:text-4xl font-bold no-underline text-black dark:text-white'>✨ 이달의 추천 상품 ✨</Link>
      <div className='px-10 sm:px-32 md:px-24 lg:px-12 xl:px-24 2xl:px-44'>
        <ImageGalleryComp items={products} fontSize='15' component={RcmndProductComp} rows={2} />
      </div>
    </div>
  );
};
