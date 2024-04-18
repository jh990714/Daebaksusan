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
        <div className="space-y-12 mx-4">
            <div className='space-y-6'>
                <div className="py-1 text-xl text-start border-b">쇼핑 정보</div>
                <div><Link to='/paymentDetails' className="text-gray-700 no-underline">주문 내역 {'>'}</Link></div>
            </div>

            <div className='space-y-6'>
                <div className="py-1 text-xl text-start border-b">활동 관리</div>
                <div><Link to="#" className="text-gray-700 no-underline">1:1 문의 {'>'}</Link></div>
            </div>

            <div className='space-y-6'>
                <div className="py-1 text-xl text-start border-b">회원정보</div>
                <div><Link to="#" className="text-gray-700 no-underline">정보 수정 {'>'}</Link></div>
                <div><Link to="#" className="text-gray-700 no-underline">회원 탈퇴 {'>'}</Link></div>
                <div onClick={handleLogOut}><Link to="#" className="text-gray-700 no-underline">로그아웃 {'>'}</Link></div>
            </div>
        </div>
    )
}
