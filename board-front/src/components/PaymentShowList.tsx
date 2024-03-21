import axios from 'axios';
import { useEffect, useState } from 'react'
import { PaymentItem, ProductList } from 'types';
import { PaymentItemComp } from './PaymentItemComp';
import styles from './PaymentShowList.module.css';

export const PaymentShowList = () => {
    const [paymentItems, setPaymentLists] = useState<PaymentItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ProductList[]>('http://localhost:8080/product/all');
                const paymentItems = response.data.map(paymentList=> ({
                    paymentDate: '2024-03-01',
                    paymentNumber: '00001',
                    paymentStatus: '결제 완료',
                    deliveryStatus: '배송 완료',
                    quantity: 1,
                    paymentList,
                }));

                setPaymentLists(paymentItems);

            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다', error);
            }
        };

        fetchData();
        
    }, []);

    return (
        <div className={styles.paymentItemList}>
            <table>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>이미지</th>
                        <th>상품이름</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>주문상태</th>
                        <th>배송상태</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentItems.map((paymentItem, index) => (
                        <PaymentItemComp key={index} paymentItem={paymentItem}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}