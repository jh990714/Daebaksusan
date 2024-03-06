// 상품 목록 테스트

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SeafoodList } from 'types';
import styles from './SeafoodListComp.module.css'

interface SeafoodListCompProps {
  seafood: SeafoodList;
}

export const SeafoodListComp: React.FC<SeafoodListCompProps> = ({ seafood }) => {
  return (
    <Link to={`/detail/${seafood.id}`} className={styles.detailLink}>
      <Card style={{ width: '25rem', height: '35rem'}}>
        <Card.Img variant="top" src={seafood.url} />
        <Card.Body>
          <Card.Title>{seafood.id}</Card.Title>
          <Card.Text>{seafood.title}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
};
