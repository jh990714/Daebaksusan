import React, { useEffect, useState } from 'react'
import styles from "./Mypage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { sendRequestWithToken } from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider'; 
import { MyPageMenu } from 'components/MyPage/MyPageMenu';
import Member from 'types/interface/member.interface';
import { MyPageInfo } from 'components/MyPage/MyPageInfo';
import { PaymentDetails } from './PaymentDetails';
import { MyCoupons } from './MyCoupons';

export const Mypage: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<Member>();
    const [currentPage, setCurrentPage] = useState<string>('mypageInfo'); // 기본 페이지 설정

    useEffect(() => {
        const url = '/info';
        const post = 'GET';
        const data = null;

        const fetchData = async () => {
            try {
                const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);
                console.log(response);
                setUserInfo(response);
            } catch (error) {
                navigate('/login');
                setIsLoggedIn(false);
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {

    }, [currentPage])
    
    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };

    return (
        <div className="lg:mx-16 xl:mx-56 2xl:mx-80 mt-10 p-2 md:p-5 rounded-lg whitespace-nowrap">
            <div className="sm:flex sm:gap-3 md:gap-10 lg:gap-20 2xl:gap-32 sm:border-b sm:p-4">
                <div className="text-center sm:block text-2xl text-blue-600 font-semibold hover:cursor-pointer" onClick={()=>handlePageChange('mypageInfo')}>마이페이지</div>
                <div className="hidden sm:flex gap-2 text-lg">
                    <div>적립금</div>
                    <div className="text-blue-700 font-bold">{userInfo?.points}원</div>
                </div>
                <div className="hidden sm:flex gap-2 text-lg">
                    <div>쿠폰</div>
                    <div className="text-blue-700 font-bold hover:cursor-pointer" onClick={()=>handlePageChange('myCoupon')}>{userInfo?.coupons.length}개</div>
                </div>
                <div className="hidden sm:block grow text-end">
                    <span className="text-gray-600 font-semibold">{userInfo?.name} </span>
                    <span className="text-gray-600">고객님</span>
                    <a href="#" className="text-blue-600 ml-2">회원 정보 수정 {'>'}</a>
                </div>
            </div>
            <div className="sm:py-5">
                <div className="sm:flex sm:justify-between">
                    <div className="sm:block w-full sm:w-1/6 border-b border-t sm:border-b-0 sm:border-t-0 sm:border-r text-l font-semibold" >
                        <MyPageMenu handlePageChange={handlePageChange} />
                    </div>
                    <div className="sm:w-4/5">
                        {currentPage === 'mypageInfo' ? <MyPageInfo userInfo={userInfo}/> : null}
                        {currentPage === 'paymentDetails' ? <PaymentDetails /> : null}
                        {currentPage === 'myCoupon' ? <MyCoupons coupons={userInfo?.coupons}/> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
