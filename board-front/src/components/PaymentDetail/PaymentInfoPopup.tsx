import { sendRequestWithToken } from 'apis/sendRequestWithToken';
import axios from 'axios';
import { useAuthContext } from 'hook/AuthProvider';
import React, { useEffect, useState } from 'react';

interface PaymentInfoPopupProps {
    onClose: () => void;
    orderNumber: string;
}

interface PaymentAndOrderInfo {
    orderNumber: string;
    orderAt: number; // UNIX timestamp로 변경
    productName: string;
    name: string;
    postCode: string;
    address: string;
    phone: string;
    paymentAt: string; // ISO 8601 형식의 문자열로 변경
    paymentStatus: string;
    paymentMethod: string;
    amount: number;
    pgProvider: string;
    payerName: string;
    cardName: string;
    installmentMonths: number | null;
    bankName: string;
    cardNumber: string;
    vbankName: string;
    vbankNum: string;
    vbankHolder: string;
    vbanIssuedAt: number;
    bankNum: string;
    bankHolder: string;
}


export const PaymentInfoPopup: React.FC<PaymentInfoPopupProps> = ({ onClose, orderNumber }) => {
    const [paymentInfo, setPaymentInfo] = useState<PaymentAndOrderInfo | null>(null);
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();

    useEffect(() => {
        // API 호출하여 결제 정보 및 주문 정보 가져오기
        console.log(orderNumber)

        const fetchPaymentInfo = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/getPaymentAndOrderInfo/` + orderNumber)
                console.log(response)
                setPaymentInfo(response.data.body);
            } catch (error) {
                alert('결제 정보를 불러오는 중 오류가 발생하였습니다.');
            }
        };

        fetchPaymentInfo();
    }, []);

    const handleCancel = async () => {
        setShowCancelConfirmation(true);
    };

    const confirmCancel = async () => {
        setShowCancelConfirmation(false); // 모달 닫기
        const url = `/payment/refundIamport/${orderNumber}`;
        const method = 'POST';
        const data = null;

        try {
            const response = await sendRequestWithToken(url, method, data, setIsLoggedIn);
            console.log(response);
            if (response.statusCodeValue == 200) {
                alert('결제가 취소되었습니다.');
            } else {
                alert('취소실패: ' + response.body);
            }
        } catch (error) {
            console.error('결제 취소 오류:', error);
            alert('결제 취소 중 오류가 발생했습니다.');
        }
    };



    return (

        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-xl w-full overflow-y-auto max-h-[60%]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="m-0 text-lg font-bold">주문 정보</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <table className="w-full mb-6 text-left">
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="font-bold pr-4 py-2">주문 번호:</td>
                            <td className="py-2">{paymentInfo?.orderNumber}</td>
                        </tr>
                        <tr>
                            <td className="font-bold pr-4 py-2">주문 일시:</td>
                            <td className="py-2">{paymentInfo && paymentInfo.orderAt ? new Date(paymentInfo.orderAt * 1000).toLocaleString() : '-'}</td>

                        </tr>
                        <tr>
                            <td className="font-bold pr-4 py-2">상품명:</td>
                            <td className="py-2">{paymentInfo?.productName}</td>
                        </tr>
                        <tr>
                            <td className="font-bold pr-4 py-2">수령인:</td>
                            <td className="py-2">{paymentInfo?.name}</td>
                        </tr>
                        <tr>
                            <td className="font-bold pr-4 py-2">배송 주소:</td>
                            <td className="py-2">{paymentInfo?.address}</td>
                        </tr>
                        <tr>
                            <td className="font-bold pr-4 py-2">연락처:</td>
                            <td className="py-2">{paymentInfo?.phone}</td>
                        </tr>
                    </tbody>
                </table>


                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">결제 정보</h2>
                </div>
                <table className="w-full mb-6 text-start">
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="font-bold pr-4 py-2">결제 일시:</td>
                            <td className="py-2">{paymentInfo && paymentInfo.paymentAt ? new Date(paymentInfo.paymentAt).toLocaleString() : '-'}</td>

                        </tr>

                        <tr>
                            <td className="font-bold pr-4 py-2">결제 수단:</td>
                            <td className="py-2">{paymentInfo?.paymentMethod}</td>
                        </tr>



                        {/* paymentMethod에 따라 다른 정보 표시 */}
                        {paymentInfo?.paymentMethod === '무통장 입금' && (
                            <>
                                <tr>
                                    <td className="font-bold pr-4 py-2">입금 은행:</td>
                                    <td className="py-2">{paymentInfo?.vbankName}</td>
                                </tr>

                                <tr>
                                    <td className="font-bold pr-4 py-2">가상 계좌 번호:</td>
                                    <td className="py-2">{paymentInfo?.vbankNum}</td>
                                </tr>
                            </>
                        )}
                        {paymentInfo?.paymentMethod === '계좌이체' && (
                            <tr>
                                <td className="font-bold pr-4 py-2">입금 은행:</td>
                                <td className="py-2">{paymentInfo?.bankName}</td>
                            </tr>

                        )}

                        {paymentInfo?.paymentMethod === '신용/체크카드' && (
                            <>
                                <tr>
                                    <td className="font-bold pr-4 py-2">카드 종류:</td>
                                    <td className="py-2">{paymentInfo?.cardName}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold pr-4 py-2">할부 개월 수:</td>
                                    <td className="py-2">{paymentInfo?.installmentMonths ? `${paymentInfo.installmentMonths}개월` : ''}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold pr-4 py-2">카드 번호:</td>
                                    <td className="py-2">{paymentInfo?.cardNumber}</td>
                                </tr>
                            </>
                        )}

                        <tr>
                            <td className="font-bold pr-4 py-2">결제 금액:</td>
                            <td className="py-2">{paymentInfo?.amount.toLocaleString()} 원</td>
                        </tr>

                        <tr>
                            <td className="font-bold pr-4 py-2">결제 상태:</td>
                            <td className="py-2">{paymentInfo?.paymentStatus}</td>
                        </tr>
                    </tbody>
                </table>

                {showCancelConfirmation && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg max-w-md w-full">
                            <p>결제를 취소하시겠습니까?</p>
                            <div className="flex justify-center mt-4">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={confirmCancel}>확인</button>
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShowCancelConfirmation(false)}>취소</button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentInfo?.paymentStatus !== '결제 취소' && (
                    <div className="flex justify-center">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={handleCancel}
                        >
                            결제 취소
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};
