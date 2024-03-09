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
            <img src='http://fs.arumnet.com/image/N2780HKSSH/event/27800000443265/대게VS홍게_웹_메인.jpg' className={styles.mainVisal}></img>
        </Carousel.Item>
        <Carousel.Item>
            <img src='http://fs.arumnet.com/image/N2780HKSSH/event/27800000627569/밀키트_웹_메인.jpg' className={styles.mainVisal}></img>
        </Carousel.Item>
        <Carousel.Item>
          <img src='http://fs.arumnet.com/image/N2780HKSSH/event/27800001666439/멍게_웹_메인.jpg' className={styles.mainVisal}></img>
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default CarouselComp;
