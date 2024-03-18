import React from 'react';

import CarouselComp from 'components/CarouselComp';
import img from '../assets/testimg.jpg'
import { BestProduct } from 'components/BestProduct';
import { HomeBanner1 } from 'components/HomeBanner/HomeBanner1';
import { HomeBanner2 } from 'components/HomeBanner/HomeBanner2';

import './Home.css'

export const Home: React.FC = () => {
  return (
    <div className='homeContainer'>
      <div className='carouselContainer'>
        <CarouselComp img={img} />
      </div>
      <div className='HomeBanner1'>
        <HomeBanner1 />
      </div>
      <div>ss</div>
      
      <BestProduct category='./bestProducts'/>
      <BestProduct category='./newProducts'/>
      <BestProduct category='./allProducts'/>
    </div>
  );
};
