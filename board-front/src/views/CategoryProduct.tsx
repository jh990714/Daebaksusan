import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ProductList } from 'types';
import { ProductListComp } from '../components/product/ProductListComp';
import styles from './CategoryProduct.module.css';

interface CategoryProductProp {
    category: string;
}

export const CategoryProduct: React.FC<CategoryProductProp> = ({category}) => {
    const [visibleCount, setVisibleCount] = useState<number>(12);
    const [products, setProducts] = useState<ProductList[]>([])
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
            setProducts(response.data);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
        };

        fetchData();
    }, []);

    // 현재 페이지에 보여줄 상품 데이터 계산
    const getCurrentPageData = () => {
        return products.slice(0, visibleCount);
    };

    const handleMoreClick = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 4, products.length));
    }
    return (
        <div className={styles.homeContainer}>
          <div className={styles.productListContainer}>
            <div className={styles.productListHeader}>
              <div className={styles.productListTitle}>{pageTitle}</div>
            </div>
            <div>
              <ul className={styles.productList}>
                {getCurrentPageData().map((product: ProductList, index: number) => (
                  <li key={product.productId} className={index >= visibleCount - 4 && visibleCount < products.length ? `${styles.blurEffect}` : ''}>
                    <ProductListComp product={product} size='255px' fontSize='7px'/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {visibleCount < products.length && (
              <button className={styles.moreButtonContainer} onClick={handleMoreClick}>더 보 기</button>
            )}
        </div>
      )
}
