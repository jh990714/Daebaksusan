import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PaymentDetail } from 'types';

import styles from './PaymentShowList.module.css';
import { PaymentItemComp } from './PaymentItemComp';

interface PaymentShowListProps {
    paymentDetails: PaymentDetail[]
}

export const PaymentShowList: React.FC<PaymentShowListProps> = ({ paymentDetails }) => {
    return (
        <div className={styles.paymentItemList}>
            <table>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>이미지</th>
                        <th>상품이름</th>
                        <th>결제 가격</th>
                        <th>수량</th>
                        <th>주문상태</th>
                        <th>배송상태</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentDetails.map((paymentDetail, index) => (
                        <React.Fragment key={index}>
                            {paymentDetail.orderItems.map((orderItem, innerIndex) => (
                                <PaymentItemComp
                                    key={innerIndex}
                                    orderItem={orderItem}
                                    index={innerIndex}
                                    orderNumber={paymentDetail.orderNumber}
                                    isCancelled={paymentDetail.cancel}
                                    rowspan={paymentDetail.orderItems.length}
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
