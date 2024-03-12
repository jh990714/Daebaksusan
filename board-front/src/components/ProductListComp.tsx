import React from 'react'
import { Link } from 'react-router-dom';
import { ProductList } from 'types';
import styles from './ProductListComp.module.css';

interface ProductListCompProps {
  product: ProductList;
}

export const ProductListComp: React.FC<ProductListCompProps> = ({ product }) => {
  
  return (
    <Link to={`/detail/`} className={styles.detailLink}>
      <div className={styles.productInfoCard} >
        <img src={`./upload/${product.productImgPath}`} alt="사진" className={styles.productImg}></img>

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
