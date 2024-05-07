import Carousel from 'react-bootstrap/Carousel';
import styles from './CarouselComp.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CarouselItem } from 'types'; // CarouselItem 타입을 가져옵니다.

const CarouselComp = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/getCarousel`);
        console.log(response.data)
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    fetchCarouselImages();
  }, []);

  return (
    <Carousel>
      {carouselItems.map((carouselItem, index) => (
        <Carousel.Item key={index}>
          <img src={carouselItem.imageUrl} className={styles.mainVisual} alt={`Carousel Image ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComp;
