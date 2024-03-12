import React from 'react'
import logo from '../assets/logo.jpg'
import styles from  './NavigationBar.module.css'
import { Link } from 'react-router-dom'

export const NavigationBar = () => {
  return (
    <nav className={styles.navContainer}>
        <div className={styles.navLeft}>
            <Link to='' className={styles.logo}> 
                <img src={logo} alt="로고" width="180" height="180"></img>
            </Link>

            <div className={styles.productCategory}>
                <ul>
                    <li><Link to='/bestProducts'> 인기 상품 </Link></li>
                    <li><Link to='/newProducts'> 최신 상품 </Link></li>
                    <li><Link to='/allProducts'> 상품 </Link></li>
                </ul>
            </div> 
        </div>
                  
       
        <div className={styles.navRight}>
            
            <div className={styles.searchInput}>
                <input type="text" placeholder="상품을 검색해보세요!" />
            </div>
            <div className={styles.userCategory}>
                <ul>
                    <li><Link to='/login'> 로그인 </Link></li>
                    <li><Link to='/cart'> 장바구니 </Link></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
