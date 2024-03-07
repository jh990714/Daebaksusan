import React from 'react'
import logo from '../assets/logo.jpg'
import styles from  './NavigationBar.module.css'
import { Link } from 'react-router-dom'

export const NavigationBar = () => {
  return (
    <nav className={styles.navContainer}>
        <Link to='' className={styles.logo}> 
            <img src={logo} alt="로고" width="200" height="200"></img>
        </Link>
        
        <div className={styles.product}>
            <div className={styles.productCategory}>
                <ul>
                    <li><Link to=''> 인기 상품 </Link></li>
                    <li><Link to=''> 최신 상품 </Link></li>
                    <li><Link to=''> 상품 </Link></li>
                </ul>
            </div>           
        </div>

        <div className={styles.product}>
            <div className={styles.searchInput}>
                <input type="text" placeholder="상품을 검색해보세요!" />
            </div>
            <div className={styles.userCategory}>
                <ul>
                    <li><Link to=''> 로그인 </Link></li>
                    <li><Link to=''> 장바구니 </Link></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
