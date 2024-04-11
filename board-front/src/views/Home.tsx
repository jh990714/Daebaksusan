import React from 'react';

import CarouselComp from 'components/CarouselComp';
import img from '../assets/testimg.jpg'
import { BestProduct } from 'components/BestProduct';
import { HomeBanner1 } from 'components/HomeBanner/HomeBanner1';
import { useAnimateOnScroll } from 'hook/useAnimateOnScroll '
import './Home.css'
import { HomeBanner2 } from 'components/HomeBanner/HomeBanner2';
import TimeLimitedDeals from 'components/Deals/TimeLimitedDeals';

export const Home: React.FC = () => {
  const ref1 = useAnimateOnScroll();
  const ref2 = useAnimateOnScroll();
  const ref3 = useAnimateOnScroll();
  const ref4 = useAnimateOnScroll();
  const ref5 = useAnimateOnScroll();
  
  return (
    <div className='homeContainer'>
      <div className='carouselContainer'>
        <CarouselComp img={img} />
      </div>

      <div ref={ref1} className='HomeBanner'>
        <TimeLimitedDeals />
      </div>

      <div ref={ref2} className='HomeBanner'>
        <HomeBanner2 />
      </div>

      <div ref={ref3}>
        <BestProduct category='./bestProducts'/>
      </div>

      <div ref={ref4}>
        <BestProduct category='./newProducts'/>
      </div>

      <div ref={ref5}>
        <BestProduct category='./allProducts'/>
      </div>
    </div>
  );
};
