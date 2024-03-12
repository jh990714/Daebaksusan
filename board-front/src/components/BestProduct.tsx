import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './BestProduct.module.css';
import { ProductList } from 'types';
import { ProductListComp } from 'components/ProductListComp';
import { Link } from 'react-router-dom';

interface CategoryProductProp {
  category: string;
}

export const BestProduct: React.FC<CategoryProductProp> = ({category}) => {
  const [products, setProducts] = useState<ProductList[]>([]);

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
          setProducts(response.data.slice(0, 6));

      } catch (error) {
          console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.productListContainer}>
        <div className={styles.titleContainer}>
          <Link to={category} className={styles.productListTitle}> {pageTitle} </Link>
          <Link to={category} className={styles.moreButton}> 더보기 </Link>
        </div>
        <div>
          <ul className={styles.productList}>
            {products.map((product: ProductList) => (
              <li key={product.productId}>
                <ProductListComp product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
