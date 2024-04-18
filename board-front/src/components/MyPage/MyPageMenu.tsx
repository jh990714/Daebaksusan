import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Mypage.module.css";
import { useAuthContext } from 'hook/AuthProvider';

export const MyPageMenu = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false)
        navigate('/')
    };

  return (
      <ul className="space-y-6">
          <li><Link to='/paymentDetails' className="text-gray-700 underline">주문 내역 {'>'}</Link></li>
          <li><Link to='/cart' className="text-gray-700 underline">장바구니 {'>'}</Link></li>
          <li><Link to="/reviews" className="text-gray-700 underline">상품 후기 {'>'}</Link></li>
          <li><Link to="#" className="text-gray-700 underline">1:1 문의 {'>'}</Link></li>
          <li><Link to="#" className="text-gray-700 underline">회원 탈퇴 {'>'}</Link></li>
          <li onClick={handleLogOut}><Link to="#" className="text-gray-700 underline">로그아웃 {'>'}</Link></li>
      </ul>
  )
}
