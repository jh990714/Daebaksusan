import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PaymentDetail } from 'types';

import styles from './PaymentShowList.module.css';
import { PaymentItemComp } from './PaymentItemComp';

interface PaymentShowListProps {
    paymentDetails: PaymentDetail[]
}

export const PaymentShowList: React.FC<PaymentShowListProps> = ({ paymentDetails }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [cancelStatus, setCancelStatus] = useState<boolean[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 1280);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const initialCancelStatus = paymentDetails.map(payment => payment.cancel);
        setCancelStatus(initialCancelStatus);
        console.log(initialCancelStatus)
    }, [paymentDetails]);

    const handleCancelStatusChange = (index: number, newValue: boolean) => {
        const newCancelStatus = [...cancelStatus];
        newCancelStatus[index] = newValue;
        setCancelStatus(newCancelStatus);
    };

    return (
        <div className={styles.paymentItemList}>
            <table>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        {!isMobileView && <th>이미지</th>}
                        {!isMobileView && <th>상품이름</th>}
                        {!isMobileView && <th>결제 가격</th>}
                        {!isMobileView && <th>수량</th>}
                        {!isMobileView && <th>주문상태</th>}
                        {!isMobileView && <th>배송상태</th>}
                        {isMobileView && <th>상품 정보</th>}
                        {isMobileView && <th>주문 정보</th>}
                    </tr>
                </thead>
                <tbody>
                    {paymentDetails.map((paymentDetail, index) => (
                        <React.Fragment key={index}>
                            {paymentDetail.orderItems.map((orderItem, innerIndex) => (
                                <PaymentItemComp
                                    key={innerIndex}
                                    orderItem={orderItem}
                                    orderNumber={paymentDetail.orderNumber}
                                    isCancelled={cancelStatus[index]}
                                    isFirstItem={innerIndex === 0}
                                    rowspan={paymentDetail.orderItems.length}
                                    isMobileView={isMobileView}
                                    onCancelStatusChange={(newValue: boolean) => handleCancelStatusChange(index, newValue)}
                                />
                            ))}
                            
                            <tr>
                                <td colSpan={7}></td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
