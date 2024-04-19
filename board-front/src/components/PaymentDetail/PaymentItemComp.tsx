import { sendRequestWithToken } from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';
import React, { useState } from 'react';
import { CartItem } from "types";
import { PaymentInfoPopup } from './PaymentInfoPopup';

interface PaymentItemCompProps {
    orderNumber: string;
    paymentItem: CartItem;
    isCancelled: boolean;
    rowspan: number;
}   

export const PaymentItemComp: React.FC<PaymentItemCompProps> = ({ orderNumber, paymentItem, isCancelled, rowspan }) => {
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    
    const totalPrice = (paymentItem.product.regularPrice - paymentItem.product.salePrice) * paymentItem.quantity;
    const shippingCost = paymentItem.product.shippingCost * paymentItem.boxCnt;
    const optionCost = paymentItem.option?.addPrice ? paymentItem.option.addPrice * paymentItem.boxCnt : 0;


    const handleShowInfo = () => {
        setShowPaymentInfo(true);
    }

    return (
        <tr style={{ backgroundColor: isCancelled ? '#F3F4F6' : 'transparent', borderBottom: '1px solid #E5E7EB' }}>
            {orderNumber && (
                <td className="py-4 px-6 border-r" rowSpan={rowspan}>
                    <p className={`text-gray-500 text-sm mb-0 ${isCancelled ? 'line-through' : ''}`}>{orderNumber}</p>
                </td>
            )}
            <td className="py-4 px-6">
                <div style={{ position: 'relative', width: 100, height: 100 }}>
                    <img src={`./upload/${paymentItem.product.imageUrl}`} alt={paymentItem.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isCancelled && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(128, 128, 128, 0.6)', zIndex: 1 }}></div>}
                </div>
            </td>
            <td className="py-4 px-6 max-w-[150px] ">
                <p className={`overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold mb-1 ${isCancelled ? 'line-through' : ''}`}>{paymentItem.product.name}</p>
                {paymentItem.option && (
                    <p className={`text-sm text-gray-500 ${isCancelled ? 'line-through' : ''}`}>{paymentItem.option.name} +{paymentItem.option.addPrice.toLocaleString()}원</p>
                )}
            </td>
            <td className={`py-4 px-6 text-lg font-bold ${isCancelled ? 'line-through' : ''}`}>
                {(totalPrice + shippingCost + optionCost).toLocaleString()}원
            </td>
            <td className={`py-4 px-6 text-lg font-bold ${isCancelled ? 'line-through' : ''}`}>
                {paymentItem.quantity}
            </td>
            {orderNumber && (
                <>
                    <td className="py-4 px-6 border-l" rowSpan={rowspan}>
                        <div className="flex flex-col h-full">
                         
                         {isCancelled ? (
                            <p className="py-2 px-4 text-sm font-medium text-red-500">취소 완료</p>
                         ) : (
                            <p className="py-2 px-4 text-sm font-medium text-blue-700">결제 완료</p>
                         )}
                         
                            <button className="py-2 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700" onClick={handleShowInfo}>결제 정보</button>
                            
                           
                        </div>
                    </td>
                    
                    <td className="py-4 px-6 border-l" rowSpan={rowspan}>
                        {!isCancelled && (
                            <button className="py-2 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">배송 정보</button>
                        )}
                    </td>
                </>
            )}

            {/* 결제 정보 팝업 컴포넌트 */}
            {showPaymentInfo && <PaymentInfoPopup onClose={() => setShowPaymentInfo(false)} orderNumber={orderNumber} />}
        </tr>
    );
};
