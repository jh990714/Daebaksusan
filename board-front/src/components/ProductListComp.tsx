import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductList } from 'types';
import styles from './SeafoodListComp.module.css'

interface ProductListCompProps {
    product: ProductList;
  }

export const ProductListComp: React.FC<ProductListCompProps> = ({ product }) => {
    console.log(product.productImgPath);
    
  return (
    <Link to={`/detail/${product.productID}`} className={styles.detailLink}>
      <Card style={{ width: '25rem', height: '35rem'}}>
        <Card.Img variant="top" src={product.productImgPath} />
        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>{product.productPrice}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Link>
  )
}
