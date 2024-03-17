import React, { useEffect, useState } from 'react'
import RecentProducts from '../components/SideBar/RecentProducts'
import styles from './SideBar.module.css'
import { KakaoSideBar } from 'components/SideBar/KakaoSideBar';

export const SideBar = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = 200; // Navbar의 높이를 변수로 지정, 실제 높이에 맞게 조정 필요
            const shouldBeSticky = window.scrollY > navbarHeight;
            setIsSticky(shouldBeSticky);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);
    
    return (
        <div className={`${styles.sideBarContainer} ${isSticky ? styles.fixed : ''}`}>
            <div className={styles.sideBar1}> <RecentProducts /> </div>
            <div className={styles.sideBar2}> <KakaoSideBar /> </div>
        </div>
    )
}
