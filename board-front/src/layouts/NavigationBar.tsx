import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import styles from  './NavigationBar.module.css'
import cartIcon from '../assets/Cart.png'
import loginIcon from '../assets/login.png'
import newIcon from '../assets/newIcon.png'
import bestIcon from '../assets/bestIcon.png'
import menuIcon from '../assets/tabBar.png'

import searchIcon from '../assets/search.png'
import { Link } from 'react-router-dom'

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className={styles.navContainer}>
        <div className={styles.navLeft}>
            <Link to='' className={styles.logo}> 
                <img src={logo} alt="로고" width="180" height="180"></img>
            </Link>

            <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={menuIcon} alt="메뉴" style={{width: 30, height: 30}}/>
            </div>
        </div>

        
        <div className={`${styles.navMenu} ${isMenuOpen ? styles.show : ''}`}>
            <div className={styles.productCategory}>
                <ul>
                    <li>
                        <Link to='/bestProducts' className={styles.icon}>
                            <img src={bestIcon} alt='인기 상품' style={{width: 50, height: 50}}/>
                            <span className={styles.iconTitle}> 인기 상품 </span>                     
                        </Link>
                    </li>
                    <li>
                        <Link to='/newProducts' className={styles.icon}>
                            <img src={newIcon} alt='최신 상품' style={{width: 50, height: 50}}/>
                            <span className={styles.iconTitle}> 최신 상품 </span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/allProducts' className={styles.icon}>
                            <img src={cartIcon} alt='모든 상품' style={{width: 50, height: 50}}/>
                            <span className={styles.iconTitle}> 모든 상품 </span>                      
                        </Link>
                    </li>
                </ul>
            </div> 
        
            <div className={styles.navRight}>
                <div className={styles.searchInput}>
                    <input type="text" placeholder="상품을 검색해보세요!" />
                    <Link to='/search' className={styles.icon}>
                        <img src={searchIcon} alt='검색' style={{width: 30, height: 30}}/>
                    </Link>
                </div>
                <div className={styles.userCategory}>
                    <ul>
                        <li>
                            <Link to='/login' className={styles.icon}>
                                <img src={loginIcon} alt='로그인' style={{width: 50, height: 50}}/>
                                <span className={styles.iconTitle}> 로그인 </span>
                            </Link></li>
                        <li>
                            <Link to='/cart' className={styles.icon}>
                                <img src={cartIcon} alt='장바구니' style={{width: 50, height: 50}}/>
                                <span className={styles.iconTitle}> 장바구니 </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  )
}
