import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OrderFlow } from 'components/OrderFlow';

export const SuccessOrder = () => {
    const location = useLocation();
    const state = location.state;

    // 전달된 데이터가 없는 경우에 대한 처리
    if (!state) {
        alert('주문정보가 없습니다.');
        return null;
    }

    const { orderNumber, iamportResponse } = state;
    const { buyerName, buyerTel, buyerAddr, buyerPostcode } = iamportResponse;
    const { pgProvider, amount, name } = iamportResponse;

    return (
        <div className="px-4 sm:px-6 lg:px-8 xl:px-16">
            <OrderFlow currentStep={3} />
            <div className="bg-white min-h-screen text-left">
                <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
                    <h1 className="text-xs sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center whitespace-nowrap">
                        고객님의 주문이 완료되었습니다.
                    </h1>
                    <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                        <p className="text-sm sm:text-base font-semibold mb-2">주문 번호:</p>
                        <p className="text-base sm:text-lg font-semibold">{orderNumber}</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                        <div className="mb-4">
                            <p className="text-sm sm:text-lg font-semibold mb-2">배송지 정보</p>
                            <ul className="pl-2 sm:pl-4">
                                <li className="flex text-xs sm:text-base">
                                    <span className="font-semibold inline-block w-20 sm:w-32">받으시는 분:</span>
                                    {buyerName}
                                </li>
                                <li className="flex text-xs sm:text-base">
                                    <span className="font-semibold inline-block w-20 sm:w-32">우편번호:</span>
                                    {buyerPostcode}
                                </li>
                                <li className="flex text-xs sm:text-base">
                                    <span className="font-semibold inline-block w-20 sm:w-32">주소:</span>
                                    {buyerAddr}
                                </li>
                                <li className="flex text-xs sm:text-base">
                                    <span className="font-semibold inline-block w-20 sm:w-32">전화번호:</span>
                                    {buyerTel}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                        <p className="text-sm sm:text-lg font-semibold mb-2">결제 정보</p>
                        <ul className="pl-2 sm:pl-4">
                            <li className="flex text-xs sm:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-32">상품명:</span>
                                {name}
                            </li>
                            <li className="flex text-xs sm:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-32">최종결제 금액:</span>
                                {amount.toLocaleString()}원
                            </li>
                            <li className="flex text-xs sm:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-32">결제 수단:</span>
                                {pgProvider}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10">
                    <Link to="/myPage">
                        <button className="text-xs sm:text-sm lg:text-base whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
                            구매내역 확인하기
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="text-xs sm:text-sm lg:text-base whitespace-nowrap bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
                            쇼핑하러 가기
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
