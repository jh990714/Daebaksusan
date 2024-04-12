
import { Product } from 'types'
import styles from './RcmndProductComp.module.css'
import tag from 'assets/bestProductIcon.png'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface RcmndProductCompProps {
  product: Product;
}

export const RcmndProductComp:React.FC<RcmndProductCompProps> = ({product}) => {
  const addToRecentProducts = (product: Product) => {
        const maxRecentProducts = 7; // 최대 저장할 최근 본 상품의 수
        const recentProducts = Cookies.get('recentProducts') ? JSON.parse(Cookies.get('recentProducts')!) : [];

        const updatedRecentProducts = recentProducts.filter((p: Product) => p.productId !== product.productId);
        updatedRecentProducts.unshift(product); // 가장 최근 본 상품을 배열 앞쪽에 추가

        if (updatedRecentProducts.length > maxRecentProducts) {
            updatedRecentProducts.pop(); // 배열의 최대 크기를 초과하는 경우, 가장 오래된 상품을 제거
        }

        Cookies.set('recentProducts', JSON.stringify(updatedRecentProducts), { expires: 1 }); // 쿠키에 저장, 유효 기간은 1일

    };
  return (
    <Link to={`/detail/`} state={{ product: product }} className={styles.detailLink} onClick={() => addToRecentProducts(product)}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={process.env.PUBLIC_URL + `/upload/${product.imageUrl}`} alt='추천 상품' className={styles.rcmdImg}/>
          <img src={tag} alt='추천 상품' className={styles.rcmdTag} />
        </div>
        <div className={styles.rcmdInfo}>
          <p className={styles.title}> {product.name} </p>
          <p className={styles.beforeprice}> {product.regularPrice.toLocaleString()}원 </p>
          <p className={styles.afterprice}>  {(product.regularPrice - product.salePrice).toLocaleString()}원 </p>
        </div>
      </div>
    </Link>
  )
}
