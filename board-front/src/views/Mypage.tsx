import React, { useEffect, useState } from 'react'
import styles from "./Mypage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { sendRequestWithToken } from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider'; import { MyPageMenu } from 'components/MyPage/MyPageMenu';
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
        <div className="lg:mx-16 xl:mx-56 2xl:mx-80 mt-10 p-2 md:p-5 rounded-lg whitespace-nowrap">
            <div className="sm:flex sm:gap-3 md:gap-10 lg:gap-20 2xl:gap-32 sm:border-b sm:p-4">
                <div className="text-center sm:block text-2xl text-blue-600 font-semibold">마이페이지</div>
                <div className="hidden sm:flex gap-2 text-lg">
                    <div>적립금</div>
                    <div className="text-blue-700 font-bold">{userInfo?.points}원</div>
                </div>
                <div className="hidden sm:flex gap-2 text-lg">
                    <div>쿠폰</div>
                    <div className="text-blue-700 font-bold">{userInfo?.coupons.length}개</div>
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
                        <MyPageMenu />
                    </div>
                    <div className="sm:w-4/5">
                        <div className="my-4 sm:hidden grid grid-cols-2">
                            <div className="p-4 text-center border-t-4 border-l-4 border-b-4 border-blue-700">
                                <div className="text-lg font-semibold">적립금</div>
                                <div className="text-blue-600 text-2xl font-semibold mt-2">{userInfo?.points.toLocaleString()}점</div>
                                <div className="mt-2 inline-block">
                                    <a href="#" className={styles.myPageCategory}>적립금 조회 {'>'}</a>
                                </div>
                            </div>
                            <div className="p-4 text-center border-4 border-blue-700">
                                <div className="text-lg font-semibold">쿠폰함</div>
                                <div className="text-blue-600 text-2xl font-semibold mt-2">{userInfo?.coupons.length.toLocaleString()}개</div>
                                <div className="mt-2 inline-block">
                                    <a href="#" className={styles.myPageCategory}>쿠폰함 {'>'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="my-16 sm:my-2">
                            <div className="flex justify-center mb-8">
                                <div className="text-2xl font-semibold">주문처리 현황</div>
                                <div className="ml-2 text-xs mt-2">(최근 3개월 기준)</div>

                            </div>
                            <div className="grid grid-cols-3">
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">결제 전</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">결제 완료</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">상품 준비 중</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                            </div>
                        </div>

                        <div className="my-16">
                            <div className="flex justify-center mb-8">
                                <div className="text-2xl font-semibold">배송처리 현황</div>
                                <div className="ml-2 text-xs mt-2">(최근 3개월 기준)</div>

                            </div>
                            <div className="grid grid-cols-4">
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">배송 준비</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">배송 중</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center border-dotted border-r-2 border-blue-700">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">배송 완료</div>
                                    <div className="text-blue-600 text-2xl font-semibold mt-2">0</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm sm:text-lg whitespace-nowrap">구매 확정</div>
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
