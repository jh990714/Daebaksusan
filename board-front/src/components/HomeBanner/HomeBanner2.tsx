import React, { useEffect, useState } from 'react';
import './HomeBanner2.css';
import { RcmndProductComp } from 'components/product/RcmndProductComp';
import axios, { AxiosResponse } from 'axios';
import { Product } from 'types';

export const HomeBanner2 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Product[]> = await axios.get<Product[]>(`${process.env.REACT_APP_API_URL}/product/new`);
        console.log(response);
        setProducts(response.data.slice(6, 10));
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='HomeBanner2Container'>
      <p className='text-4xl font-bold'>✨ 이달의 추천 상품 ✨</p>
      <div className='flex'>
        <div className='section center'>
          {products.length >= 1 && (
            <div className='item'>
              <RcmndProductComp product={products[0]} imgSize_w_per={"60%"} imgSize_h_px={"250px"}font_size='8px' border='0'/>
            </div>
          )}
          {products.length >= 2 && (
            <div className='item'>
              <RcmndProductComp product={products[0]} imgSize_w_per={"60%"} imgSize_h_px={"250px"} font_size='8px' border='0'/>
            </div>
          )}
        </div>
        <div className='section right'>
          {products.length >= 3 && (
            <div className='item'>
              <RcmndProductComp product={products[0]} imgSize_w_per={"60%"} imgSize_h_px={"250px"} font_size='8px' border='0'/>
            </div>
          )}
          {products.length >= 4 && (
            <div className='item'>
              <RcmndProductComp product={products[0]} imgSize_w_per={"60%"} imgSize_h_px={"250px"} font_size='8px' border='0'/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
