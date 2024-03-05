import React from 'react'
import styles from './NavigationBar.module.css';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headeLeftWrap}>
          <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
            <img
              style={{ width: "154px", height: "20px" }}
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="로고"
            />
          </Link>
          <ul>
            <li>
              <Link className={styles.headerNavItem} to="/movie">
                영화
              </Link>
            </li>
            <li>
              <Link className={styles.headerNavItem} to="/tv">
                TV 프로그램
              </Link>
            </li>
            <li>
              <Link className={styles.headerNavItem} to="/person">
                인물
              </Link>
            </li>
            <li>
              <Link className={styles.headerNavItem} to="/">
                More
              </Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>

  )
}
