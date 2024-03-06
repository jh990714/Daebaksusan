import Carousel from 'react-bootstrap/Carousel';
import styles from './CarouselComp.module.css'

interface CarouselProps {
    img: string;
  }
  
  const CarouselComp: React.FC<CarouselProps> = ({ img }) => {
    return (
      <Carousel>
        <Carousel.Item>
          <div className={styles.mainVisal}>
            <h2>테스트1 메시지다</h2>
            <hr/>
            <h1>할인한다</h1>
            <button>상품 보러가기</button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.mainVisal}>
            <h2>테스트2 메시지다</h2>
            <hr/>
            <h1>할인한다</h1>
            <button>상품 보러가기</button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.mainVisal}>
            <h2>테스트3 메시지다</h2>
            <hr/>
            <h1>할인한다</h1>
            <button>상품 보러가기</button>
          </div>
        </Carousel.Item>
      </Carousel>
      // <div className={styles.mainVisal}>
      //     <h2>테스트 메시지다</h2>
      //     <hr/>
      //     <h1>할인한다</h1>
      //     <button>상품 보러가기</button>
      // </div>
    );
  }
  
  export default CarouselComp;
