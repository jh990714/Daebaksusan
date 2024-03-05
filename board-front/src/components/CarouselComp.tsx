import Carousel from 'react-bootstrap/Carousel';
interface CarouselProps {
    img: string;
  }
  
  const CarouselComp: React.FC<CarouselProps> = ({ img }) => {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="첫 번째 슬라이드"
          />
          <Carousel.Caption>
            <h3>첫 번째 슬라이드 레이블</h3>
            <p>첫 번째 슬라이드 내용</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="두 번째 슬라이드"
          />
          <Carousel.Caption>
            <h3>두 번째 슬라이드 레이블</h3>
            <p>두 번째 슬라이드 내용</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="세 번째 슬라이드"
          />
          <Carousel.Caption>
            <h3>세 번째 슬라이드 레이블</h3>
            <p>세 번째 슬라이드 내용</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default CarouselComp;
