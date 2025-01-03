import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hook/AuthProvider';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';

interface MyPageMenuProps {
    handlePageChange: (page: string) => void;
}

export const MyPageMenu: React.FC<MyPageMenuProps> = ({ handlePageChange }) => {
    const { setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태

    const handleLogOut = () => {
        localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    // 메뉴 항목 클릭 시 메뉴 닫기
    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="relative">
            {/* 메뉴 UI */}
            <div
                className={`fixed top-0 left-0 h-full w-40 bg-white z-40 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:relative sm:translate-x-0 sm:w-full`}
            >
                {/* 모바일 메뉴 버튼 */}
                <button
                    className={`block sm:hidden fixed bg-blue-500 text-white px-2 py-4 rounded-full z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-full' : 'translate-x-10'
                        }`}
                    style={{ top: '50%', right: '-20px', transform: 'translateY(-50%)' }} // 세로 중앙 정렬
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >

                    <img
                        src={isMenuOpen ? leftArrow : rightArrow}
                        alt={isMenuOpen ? '닫기' : '메뉴'}
                        className="w-6 h-6"
                    />
                </button>
                <div className="mt-10 sm:mt-0 p-6 space-y-6">
                    <div>
                        <div className="py-1 text-base text-left font-semibold border-b">쇼핑 정보</div>
                        <div
                            className="text-gray-700 text-sm text-right hover:cursor-pointer mt-2"
                            onClick={() => {
                                handlePageChange('paymentDetails');
                                handleMenuItemClick(); // 메뉴 닫기
                            }}
                        >
                            주문 내역 {'>'}
                        </div>
                    </div>

                    <div>
                        <div className="py-1 text-base text-left font-semibold border-b">활동 관리</div>
                        <div className="text-gray-700 text-right text-sm mt-2">
                            <Link
                                to="#"
                                onClick={() => handleMenuItemClick()} // 메뉴 닫기
                            >
                                1:1 문의 {'>'}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="py-1 text-base text-left font-semibold border-b">회원정보</div>
                        <div
                            className="text-gray-700 text-sm text-right hover:cursor-pointer mt-2"
                            onClick={() => {
                                handlePageChange('updateInfo');
                                handleMenuItemClick(); // 메뉴 닫기
                            }}
                        >
                            정보 수정 {'>'}
                        </div>
                        <div
                            className="text-gray-700 text-sm text-right hover:cursor-pointer mt-2"
                            onClick={() => {
                                handlePageChange('memberDelete');
                                handleMenuItemClick(); // 메뉴 닫기
                            }}
                        >
                            회원 탈퇴 {'>'}
                        </div>
                        <div
                            onClick={() => {
                                handleLogOut();
                                handleMenuItemClick(); // 메뉴 닫기
                            }}
                            className="text-gray-700 text-sm text-right hover:cursor-pointer mt-2"
                        >
                            로그아웃 {'>'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 외부 클릭 시 메뉴 닫기 */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
                    onClick={handleMenuItemClick}
                ></div>
            )}
        </div>
    );
};
