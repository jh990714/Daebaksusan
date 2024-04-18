import Carousel from 'react-bootstrap/Carousel';
import styles from './CarouselComp.module.css'
import img from '../assets/test.png';

interface CarouselProps {
    img: string;
  }
  
  const CarouselComp: React.FC<CarouselProps> = ({ img }) => {
    return (
      <Carousel>
        <Carousel.Item>
            <img src={process.env.PUBLIC_URL + `/carousel/1.jpg`} className={styles.mainVisal}></img>
        </Carousel.Item>
        <Carousel.Item>
            <img src={process.env.PUBLIC_URL + `/carousel/2.jpg`} className={styles.mainVisal}></img>
        </Carousel.Item>
        <Carousel.Item>
          <img src={process.env.PUBLIC_URL + `/carousel/3.jpg`} className={styles.mainVisal}></img>
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default CarouselComp;
