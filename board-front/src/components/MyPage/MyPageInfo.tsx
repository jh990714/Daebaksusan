import React from 'react'
import Member from 'types/interface/member.interface'

interface MyPageInfoProps {
    userInfo?: Member
}
export const MyPageInfo: React.FC<MyPageInfoProps> = ({ userInfo }) => {
    return (
        <div>
            <div className="my-4 sm:hidden grid grid-cols-2">
                <div className="p-4 text-center border-t-4 border-l-4 border-b-4 border-blue-700">
                    <div className="text-lg font-semibold">적립금</div>
                    <div className="text-blue-600 text-2xl font-semibold mt-2">{userInfo?.points.toLocaleString()}점</div>
                    <div className="mt-2 inline-block">
                        <a href="#" className="text-inherit">적립금 조회 {'>'}</a>
                    </div>

                </div>
                <div className="p-4 text-center border-4 border-blue-700">
                    <div className="text-lg font-semibold">쿠폰함</div>
                    <div className="text-blue-600 text-2xl font-semibold mt-2">{userInfo?.coupons.length.toLocaleString()}개</div>
                    <div className="mt-2 inline-block">
                        <a href="#" className="text-inherit">쿠폰함 {'>'}</a>
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
    )
}