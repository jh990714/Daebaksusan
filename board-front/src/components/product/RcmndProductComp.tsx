
import styles from './RcmndProductComp.module.css'
import tag from 'assets/bestProductIcon.png'

export const RcmndProductComp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src='/upload/3.jpg' alt='추천 상품' className={styles.rcmdImg}/>
        <img src={tag} alt='추천 상품' className={styles.rcmdTag} />
      </div>
      <div className={styles.rcmdInfo}>
        <p className={styles.title}> 오징어 </p>
        <p className={styles.beforeprice}> 30,000원 </p>
        <p className={styles.afterprice}> 20,000원 </p>
      </div>
    </div>
  )
}
