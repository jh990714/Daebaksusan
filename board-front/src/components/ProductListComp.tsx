import React from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { ProductList } from 'types';
import styles from './ProductListComp.module.css';
import saleIcon from 'assets/bestProductIcon.png';

interface ProductListCompProps {
  product: ProductList;
  size: string;
  fontSize: string;
}

export const ProductListComp: React.FC<ProductListCompProps> = ({ product, size, fontSize }) => {
  const addToRecentProducts = (product: ProductList) => {
    const maxRecentProducts = 7; // 최대 저장할 최근 본 상품의 수
    const recentProducts = Cookies.get('recentProducts') ? JSON.parse(Cookies.get('recentProducts')!) : [];
    
    const updatedRecentProducts = recentProducts.filter((p: ProductList) => p.productId !== product.productId);
    updatedRecentProducts.unshift(product); // 가장 최근 본 상품을 배열 앞쪽에 추가
    
    if (updatedRecentProducts.length > maxRecentProducts) {
        updatedRecentProducts.pop(); // 배열의 최대 크기를 초과하는 경우, 가장 오래된 상품을 제거
    }
    
    Cookies.set('recentProducts', JSON.stringify(updatedRecentProducts), { expires: 1 }); // 쿠키에 저장, 유효 기간은 1일

  };

  
  return (
    <Link to={`/detail/`} className={styles.detailLink} onClick={() => addToRecentProducts(product)}>
      <div style={{width: size, fontSize: fontSize}} className={styles.productInfoCard} >
        <div className={styles.productImgWrapper}>
          {product.productPrice !== product.productDiscount && (
              <img src={saleIcon} alt="세일 아이콘" className={styles.saleIcon} />
          )}
          <img src={`./upload/${product.productImgPath}`} alt="사진" style={{width: size, height: size}} className={styles.productImg} />
        </div>

        <hr/>
        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{product.productName}</p>
          <p className={styles.productSp}>1kg(순살400g내외)</p>
          <div className={styles.productPrice}>
            <p className={styles.productDiscount}>{product.productDiscount.toLocaleString()}원</p>

            {product.productPrice !== product.productDiscount && (
              <p className={styles.productPriceBefore}>{product.productPrice.toLocaleString()}원</p>
            )}
          </div>
        </div>
      </div>
  
    </Link>
  )
}
