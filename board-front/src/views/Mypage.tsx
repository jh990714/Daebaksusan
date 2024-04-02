import React, { useEffect, useState } from 'react'
import styles from "./Mypage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import sendRequestWithToken from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';import { MyPageMenu } from 'components/MyPage/MyPageMenu';
;


export const Mypage: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<string>("");
    
    useEffect(() => {
        const url = '/info';
        const post = 'GET';
        const data = null;
        
        const fetchData = async () => {
            try {
                const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);
                console.log(response.data);

                setUserInfo(response.data);
                
            } catch (error) {
                navigate('/login');
                setIsLoggedIn(false);
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
            
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-10 p-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl text-blue-600 font-semibold">마이페이지</h1>
                <div>
                    <span className="text-gray-600 font-semibold">이광득 </span>
                    <span className="text-gray-600">고객님</span>
                    <a href="#" className="text-blue-600 ml-2">회원 정보 수정 {'>'}</a>
                </div>
            </div>
            <div className="py-5">
                <div className="flex justify-between">
                    <div className="w-1/6 border-r text-l font-semibold" >
                        <MyPageMenu />
                    </div>
                    <div className="w-3/4">
                        <div className="grid grid-cols-2">
                            <div className="p-4 text-center border-t-4 border-l-4 border-b-4 border-blue-700">
                                <div className="text-lg font-semibold">적립금</div>
                                <div className="text-blue-600 text-2xl font-semibold mt-2">3,000점</div>
                                <div className="mt-2 inline-block">
                                    <a href="#" className={styles.myPageCategory}>적립금 조회 {'>'}</a>
                                </div>
                            </div>
                            <div className="p-4 text-center border-4 border-blue-700">
                                <div className="text-lg font-semibold">쿠폰함</div>
                                <div className="text-blue-600 text-2xl font-semibold mt-2">0개</div>
                                <div className="mt-2 inline-block">
                                    <a href="#" className={styles.myPageCategory}>쿠폰함 {'>'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-center mb-4">
                                <div className="text-2xl font-semibold">나의 주문처리 현황</div>
                                <div className="text-xs mt-2">(최근 3개월 기준)</div>

                            </div>
                            <div className="grid grid-cols-4 gap-6">
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-lg">입금 전</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-lg">배송 준비 중</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-lg">배송 중</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg">배송 완료</div>
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
