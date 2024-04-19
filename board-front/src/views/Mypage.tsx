import React, { useEffect, useState } from 'react'
import styles from "./Mypage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import {sendRequestWithToken} from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';import { MyPageMenu } from 'components/MyPage/MyPageMenu';
import Member from 'types/interface/member.interface';


export const Mypage: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<Member>();
    
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

    return (
        <div className="lg:mx-16 xl:mx-56 2xl:mx-80 mt-10 p-2 md:p-5 rounded-lg">
            <div className="sm:flex justify-between items-center sm:border-b sm:pb-4">
                <h1 className="hidden sm:block text-xl text-blue-600 font-semibold">마이페이지</h1>
                <div>
                    <span className="text-gray-600 font-semibold">{userInfo?.name} </span>
                    <span className="text-gray-600">고객님</span>
                    <a href="#" className="text-blue-600 ml-2">회원 정보 수정 {'>'}</a>
                </div>
            </div>
            <div className="sm:py-5">
                <div className="sm:flex sm:justify-between">
                    <div className="hidden sm:block w-1/6 border-r text-l font-semibold" >
                        <MyPageMenu />
                    </div>
                    <div className="sm:w-3/4">
                        <div className="mt-8 grid grid-cols-2">
                            <div className="p-4 text-center border-y-[3px] border-l-[3px] border-blue-700">
                                <div className="text-lg font-semibold">적립금</div>
                                <div className="text-blue-600 text-2xl font-semibold mt-2">3,000점</div>
                                <div className="mt-2 inline-block">
                                    <a href="#" className={styles.myPageCategory}>적립금 조회 {'>'}</a>
                                </div>
                            </div>
                            <div className="p-4 text-center border-[3px] border-blue-700">
                                <div className="text-lg font-semibold">쿠폰함</div>
                                <div className="text-blue-600 text-2xl font-semibold mt-2">0개</div>
                                <div className="mt-2 inline-block">
                                    <a href="#" className={styles.myPageCategory}>쿠폰함 {'>'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16">
                            <div className="flex justify-center mb-8">
                                <div className="text-2xl font-semibold">나의 주문처리 현황</div>
                                <div className="ml-2 text-xs mt-2">(최근 3개월 기준)</div>

                            </div>
                            <div className="grid grid-cols-4">
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">입금 전</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">배송 준비 중</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">배송 중</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">배송 완료</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
