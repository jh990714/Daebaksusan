import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './BestProduct.module.css';
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import { ProductList } from 'types';
import { ProductListComp } from 'components/product/ProductListComp';
import { Link } from 'react-router-dom';
import { CategoryMenuBar } from 'layouts/CategoryMenuBar';

interface CategoryProductProp {
  category: string;
}

export const BestProduct: React.FC<CategoryProductProp> = ({category}) => {
  const [products, setProducts] = useState<ProductList[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null); // 타입스크립트를 사용하여 ref의 타입을 HTMLDivElement로 지정합니다.
  const [scrollAmount, setScrollAmount] = useState(0); // 스크롤 양 동적 조정

  const scrollLeft = () => {
    if(scrollRef.current) {
      scrollRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if(scrollRef.current) {
      scrollRef.current.scrollLeft += scrollAmount;
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
            url = 'http://localhost:8080/product';
          } else if (category === './newProducts') {
            url = 'http://localhost:8080/product';
          }
          else if (category === './allProducts') {
            url = 'http://localhost:8080/product';
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
    // 상품 리스트가 로드되고 난 후, 첫 번째 상품의 너비를 기준으로 스크롤 양을 설정합니다.
    const firstProduct = scrollRef.current?.querySelector('li');
    if (firstProduct) {
      setScrollAmount(firstProduct.clientWidth + 32);
    }
  }, [products]); // products가 변경될 때마다 실행

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollWidth <= scrollRef.current.scrollLeft + scrollRef.current.clientWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 7000);

    return () => clearInterval(timer); // 컴포넌트가 언마운트 될 때 타이머 정리
  }, []);

  const handleCategoryChange = async (newCategory: string) => {
    try {
      let url = `http://175.215.44.128:8080/product/${newCategory}`; // URL을 새 카테고리에 맞게 조정
      const response = await axios.get<ProductList[]>(url);
      setProducts(response.data.slice(0, 10));
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.productListContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.productListTitleContainer}>
            <Link to={category} className={styles.productListTitle}> {pageTitle} </Link>
            <CategoryMenuBar onCategoryChange={handleCategoryChange} />
          </div>
          
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
                  <ProductListComp product={product} size='255px' fontSize='7px'/>
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
