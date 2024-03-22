import React, { useEffect, useState } from 'react'
import styles from "./Mypage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import sendRequestWithToken from 'apis/sendRequestWithToken';



export const Mypage: React.FC = () => {
    const url = '/info';
    const post = 'GET';
    const data = null;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<string>("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendRequestWithToken(url, post, data, navigate);
                setUserInfo(response.data);
            } catch (error) {
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
                        <ul className="space-y-6">
                            <li><Link to='/paymentDetails' className={styles.myPageCategory}>주문 내역 {'>'}</Link></li>
                            <li><Link to='/cart' className={styles.myPageCategory}>장바구니 {'>'}</Link></li>
                            <li><Link to="#" className={styles.myPageCategory}>상품 후기 {'>'}</Link></li>
                            <li><Link to="#" className={styles.myPageCategory}>1:1 문의 {'>'}</Link></li>
                            <li><Link to="#" className={styles.myPageCategory}>회원 탈퇴 {'>'}</Link></li>
                        </ul>
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
