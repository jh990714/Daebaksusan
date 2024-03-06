import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { Pagination } from 'components/Pagination';
import img from '../assets/testimg.jpg'
import CarouselComp from 'components/CarouselComp';
import { ProductList } from 'types';
import { ProductListComp } from 'components/ProductListComp';

export const Home: React.FC = () => {
  const [products, setproducts] = useState<ProductList[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const itemsPerPage: number = 8; // 페이지당 아이템 개수
  const totalPages: number = Math.ceil(products.length / itemsPerPage); // 전체 페이지 수


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProductList[]>('http://localhost:8080/product');
        setproducts(response.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };
  
    fetchData();
  }, []);

  // 현재 페이지의 데이터를 가져오는 함수
  const getCurrentPageData = (): ProductList[] => {
    const startIndex: number = (pageNumber - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page: number): void => {
    setPageNumber(page);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.carouselContainer}>
        <CarouselComp img={img} />
      </div>
      <ul className={styles.productList}>
        {getCurrentPageData().map((product: ProductList) => (
          <li key={product.productID}>
            <ProductListComp product={product} />
          </li>
        ))}
      </ul>
      <div className={styles.paginationContainer}>
        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
