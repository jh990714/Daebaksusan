import { PaymentItem } from "types";

interface PaymentItemCompProps {
  paymentItem: PaymentItem;
}

export const PaymentItemComp: React.FC<PaymentItemCompProps> = ({ paymentItem }) => {
  return (
      <tr>
        <td>
          <p className='text-gray-500 text-sm mb-0'>{paymentItem.paymentDate}</p>
          <p className='mb-0'>{paymentItem.paymentNumber}</p>
        </td>
        <td><img src={`./upload/${paymentItem.paymentList.productImgPath}`} alt={paymentItem.paymentList.productName} style={{width: 100, height: 100}}/></td>
        <td className="max-w-[150px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">{paymentItem.paymentList.productName}</td>
        <td>{paymentItem.paymentList.productDiscount.toLocaleString()}원</td>
        <td>{paymentItem.quantity}</td>
        <td>
          <p className='text-blue-800 m-0 font-semibold'>{paymentItem.paymentStatus}</p>
          <button className="py-2 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> 결제 정보 </button>
        </td>
        <td>
          <p className='text-blue-800 m-0 font-semibold'>{paymentItem.deliveryStatus}</p>
          <button className="py-2 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> 결제 정보 </button>
        </td>
      </tr>
  );
};
