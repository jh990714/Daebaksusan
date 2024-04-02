import React from 'react';
import { useLocation } from 'react-router-dom';
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
    const { buyerName, buyerEmail, buyerTel, buyerAddr, buyerPostcode } = iamportResponse;
    const { payMethod, pgProvider, amount } = iamportResponse;

    return (
        <div className="bg-white min-h-screen text-left">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">고객님의 주문이 완료되었습니다.</h1>
                <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8">
                    <span className="text-l font-semibold mb-4">주문 번호:</span>
                    <span className="text-lg font-semibold mb-4"> {orderNumber}</span>
                </div>
                <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8">
                    <div className="mb-4">
                        <p className="text-lg font-semibold mb-2">배송지 정보</p>
                        <ul className="pl-4">
                            <li><span className="font-semibold inline-block w-32">받으시는 분:</span> {buyerName}</li>
                            <li><span className="font-semibold inline-block w-32">우편번호:</span> {buyerPostcode}</li>
                            <li><span className="font-semibold inline-block w-32">주소:</span> {buyerAddr}</li>
                            <li><span className="font-semibold inline-block w-32">전화번호:</span> {buyerTel}</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8">
                    <p className="text-lg font-semibold mb-2">결제 정보</p>
                    <ul className="pl-4">
                        <li><span className="font-semibold inline-block w-32">최종결제 금액:</span> {amount}</li>
                        <li><span className="font-semibold inline-block w-32">결제 수단:</span> {pgProvider}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
