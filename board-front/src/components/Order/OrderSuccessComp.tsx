import React from 'react';
import { Link } from 'react-router-dom';
import { OrdererInfo } from 'types';

interface OrderSuccessProps {
    orderNumber: string;
    orderInfo: OrdererInfo;
}

export const OrderSuccessComp: React.FC<OrderSuccessProps> = ({ orderNumber, orderInfo }) => {
    return (
        <div>
            <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center whitespace-nowrap">
                    고객님의 주문이 완료되었습니다.
                </h1>
                <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <p className="text-sm sm:text-base lg:text-lg font-semibold mb-2">주문 번호:</p>
                    <span className="pl-1 sm:pl-4 text-sm sm:text-base lg:text-lg font-semibold">{orderNumber}</span>
                </div>
                <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <div className="mb-4">
                        <p className="text-sm sm:text-base lg:text-lg font-semibold mb-2">배송지 정보</p>
                        <ul className="pl-1 sm:pl-4 space-y-2">
                            <li className="flex text-xs sm:text-sm lg:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-36 text-left pr-2">받으시는 분:</span>
                                <span className="flex-1 text-left">{orderInfo.name}</span>
                            </li>
                            <li className="flex text-xs sm:text-sm lg:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-36 text-left pr-2">우편번호:</span>
                                <span className="flex-1 text-left">{orderInfo.postalCode}</span>
                            </li>
                            <li className="flex text-xs sm:text-sm lg:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-36 text-left pr-2">주소:</span>
                                <span className="flex-1 text-left break-words">{orderInfo.address}</span>
                            </li>
                            <li className="flex text-xs sm:text-sm lg:text-base">
                                <span className="font-semibold inline-block w-28 sm:w-36 text-left pr-2">전화번호:</span>
                                <span className="flex-1 text-left">{orderInfo.phone}</span>
                            </li>
                        </ul>



                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <p className="text-sm sm:text-base lg:text-lg font-semibold mb-2">결제 정보</p>
                    <ul className="pl-1 sm:pl-4 space-y-2">
                        <li className="flex text-xs sm:text-sm lg:text-base">
                            <span className="font-semibold inline-block w-28 sm:w-32 text-left pr-2">상품명:</span>
                            <span className="flex-1 text-left">{orderInfo.itemName}</span>
                        </li>
                        <li className="flex text-xs sm:text-sm lg:text-base">
                            <span className="font-semibold inline-block w-28 sm:w-32 text-left pr-2">최종결제 금액:</span>
                            <span className="flex-1 text-left">
                                {orderInfo.itemAmount && orderInfo.itemAmount.toLocaleString()}원
                            </span>
                        </li>
                        <li className="flex text-xs sm:text-sm lg:text-base">
                            <span className="font-semibold inline-block w-28 sm:w-32 text-left pr-2">결제 수단:</span>
                            <span className="flex-1 text-left">{orderInfo.pgProvider}</span>
                        </li>
                    </ul>

                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 px-8">
                <Link to="/myPage" className="w-full sm:w-auto">
                    <button className="text-xs sm:text-sm lg:text-base bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-200 ease-in-out transform hover:scale-105">
                        구매내역 확인하기
                    </button>
                </Link>
                <Link to="/" className="w-full sm:w-auto">
                    <button className="text-xs sm:text-sm lg:text-base bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-200 ease-in-out transform hover:scale-105">
                        쇼핑하러 가기
                    </button>
                </Link>
            </div>




        </div>
    );
};
