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
    <Link to={`/detail/`} state={{ product: product}} className={styles.detailLink} onClick={() => addToRecentProducts(product)}>
      <div style={{
          '--card-size': size,
          '--card-font-size': fontSize,
        } as React.CSSProperties} 
        className={styles.productInfoCard} 
      >
        <div className={styles.productImgWrapper}>
          {product.regularPrice !== product.salePrice && (
              <img src={saleIcon} alt="세일 아이콘" className={styles.saleIcon} />
          )}
          <img src={process.env.PUBLIC_URL + `/upload/${product.imageUrl}`} alt={product.name} 
            style={{
              '--card-size': size,
              '--card-height': size,
            } as React.CSSProperties} 
            className={styles.productImg} 
          />

        </div>

        <hr/>
        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{product.name}</p>
          <p className={styles.productSp}>{product.description}</p>
          <div className={styles.productPrice}>
          {product.regularPrice && product.salePrice && (
              <>
                <p className={styles.productDiscount}>{(product.regularPrice - product.salePrice).toLocaleString()}원</p>
                <p className={styles.productPriceBefore}>{product.regularPrice.toLocaleString()}원</p>
              </>
            )}
          </div>
        </div>
      </div>
  
    </Link>
  )
}
