import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { SeafoodList } from 'types';

interface SeafoodListCompProps {
  seafood: SeafoodList;
}

export const SeafoodListComp: React.FC<SeafoodListCompProps> = ({ seafood }) => {
  return (
    <Card style={{ width: '25rem', height: '35rem'}}>
      <Card.Img variant="top" src={seafood.url} />
      <Card.Body>
        <Card.Title>{seafood.id}</Card.Title>
        <Card.Text>{seafood.title}</Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};
