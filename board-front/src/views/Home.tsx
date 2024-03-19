import React from 'react';

import CarouselComp from 'components/CarouselComp';
import img from '../assets/testimg.jpg'
import { BestProduct } from 'components/BestProduct';
import { HomeBanner1 } from 'components/HomeBanner/HomeBanner1';
import { useAnimateOnScroll } from 'hook/useAnimateOnScroll '
import './Home.css'

export const Home: React.FC = () => {
  const ref1 = useAnimateOnScroll();
  const ref2 = useAnimateOnScroll();
  const ref3 = useAnimateOnScroll();
  
  return (
    <div className='homeContainer'>
      <div className='carouselContainer'>
        <CarouselComp img={img} />
      </div>

      <div className='HomeBanner1'>
        <HomeBanner1 />
      </div>

      <div ref={ref1}>
        <BestProduct category='./bestProducts'/>
      </div>

      <div ref={ref2}>
        <BestProduct category='./newProducts'/>
      </div>

      <div ref={ref3}>
        <BestProduct category='./allProducts'/>
      </div>
    </div>
  );
};
