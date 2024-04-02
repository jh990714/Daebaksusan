import React from 'react';
import { CartItem } from "types";

interface PaymentItemCompProps {
    orderNumber: string;
    paymentItem: CartItem;
}

export const PaymentItemComp: React.FC<PaymentItemCompProps> = ({ orderNumber, paymentItem }) => {

    const totalPrice = (paymentItem.product.regularPrice - paymentItem.product.salePrice) * paymentItem.quantity;
    const shippingCost = paymentItem.product.shippingCost * paymentItem.boxCnt;
    const optionCost = paymentItem.option?.addPrice ? paymentItem.option.addPrice * paymentItem.boxCnt : 0;

    return (
        <tr>
            <td className="py-4 px-6">
                <p className='text-gray-500 text-sm mb-0'>{orderNumber}</p>
            </td>
            <td className="py-4 px-6">
                <img src={`./upload/${paymentItem.product.imageUrl}`} alt={paymentItem.product.name} style={{ width: 100, height: 100 }} />
            </td>
            <td className="py-4 px-6 max-w-[150px] ">
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold mb-1">{paymentItem.product.name}</p>
                {paymentItem.option && (
                    <p className="text-sm text-gray-500">{paymentItem.option.name} +{paymentItem.option.addPrice.toLocaleString()}원</p>
                )}
            </td>
            <td className="py-4 px-6 text-lg font-bold">
                {(totalPrice + shippingCost + optionCost).toLocaleString()}원
            </td>
            <td className="py-4 px-6 text-lg font-bold">
                {paymentItem.quantity}
            </td>
            <td className="py-4 px-6">
                <button className="py-2 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">결제 정보</button>
            </td>
            <td className="py-4 px-6">
                <button className="py-2 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">배송 정보</button>
            </td>
        </tr>
    );
};


