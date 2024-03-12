import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './BestProduct.module.css';
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import { ProductList } from 'types';
import { ProductListComp } from 'components/ProductListComp';
import { Link } from 'react-router-dom';

interface CategoryProductProp {
  category: string;
}

export const BestProduct: React.FC<CategoryProductProp> = ({category}) => {
  const [products, setProducts] = useState<ProductList[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null); // 타입스크립트를 사용하여 ref의 타입을 HTMLDivElement로 지정합니다.

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500 }); // 왼쪽으로 100px 스크롤
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500 }); // 오른쪽으로 100px 스크롤
    }
  };

  let pageTitle;

  switch (category) {
    case './bestProducts':
      pageTitle = '인기 상품';
      break;
    case './newProducts':
      pageTitle = '최신 상품';
      break;
    case './recommendedProducts':
      pageTitle = '추천 상품';
      break;
    case './allProducts':
      pageTitle = '모든 상품';
      break;
  }

  useEffect(() => {
      const fetchData = async () => {
      try {
          let url = '';
          if (category === './bestProducts') {
            url = 'http://175.215.44.128:8080/product';
          } else if (category === './newProducts') {
            url = 'http://175.215.44.128:8080/product';
          }
          else if (category === './allProducts') {
            url = 'http://175.215.44.128:8080/product';
        }

          const response = await axios.get<ProductList[]>(url);
          setProducts(response.data.slice(0, 10));

      } catch (error) {
          console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollWidth <= scrollRef.current.scrollLeft + scrollRef.current.clientWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
        }
      }
    }, 7000);

    return () => clearInterval(timer); // 컴포넌트가 언마운트 될 때 타이머 정리
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.productListContainer}>
        <div className={styles.titleContainer}>
          <Link to={category} className={styles.productListTitle}> {pageTitle} </Link>
          <Link to={category} className={styles.moreButton}> 더보기 </Link>
        </div>
        <div className={styles.productList}>
          <button className={styles.moveButton}>
            <img width="35" height="35" src={leftArrow} onClick={scrollLeft}/>
          </button>
          <div className={styles.wrapScorll} ref={scrollRef}>
            <ul>
              {products.map((product: ProductList) => (
                <li key={product.productId}>
                  <ProductListComp product={product} />
                </li>
              ))}
            </ul>
          </div>
          
          <button className={styles.moveButton}>
            <img width="35" height="35" src={rightArrow} onClick={scrollRight}/>
          </button>
          
        </div>
      </div>
              
    </div>
  );
};
