import React from 'react';

import CarouselComp from 'components/CarouselComp';
import img from '../assets/testimg.jpg'
import { BestProduct } from 'components/BestProduct';

export const Home: React.FC = () => {
  return (
    <div className='homeContainer'>
      <div className='carouselContainer'>
        <CarouselComp img={img} />
      </div>
      <div>123</div>
      <div>dd</div>
      <BestProduct category='./bestProducts'/>
      <BestProduct category='./newProducts'/>
      <BestProduct category='./allProducts'/>
    </div>
  );
};
