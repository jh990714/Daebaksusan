import React from 'react';
import { CartItem } from 'types';
import styles from './MyCartListComp.module.css';
import styles_m from './MyCartMobile.module.css';

interface OrderItemProps {
    orderItem: CartItem;
}

export const OrderItemListComp: React.FC<OrderItemProps> = ({orderItem}) => {
  return (
    <div className={styles.myCartListComp}>
        <table>
            <colgroup>
                <col width="30px"></col>
                <col width="140px"></col>
                <col></col>
                <col width="150px"></col>
                <col width="150px"></col>
            </colgroup>
            <thead>
                <tr>
                    <th data-label="칼럼명"></th>
                    <th data-label="이미지"></th>
                    <th data-label="주문 상품 정보">주문 상품 정보</th>
                    <th data-label="상품가격">상품가격</th>
                    <th data-label="수량" style={{textAlign: 'center'}}>수량</th>
                    <th data-label="합계">합계</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="칼럼명">

                    </td>
                    <td className={styles.orderImg}  data-label="이미지">
                        <img src={`./upload/${orderItem.product.productImgPath}`} alt="사진" style={{ width: 140, height: 140 }}></img>
                    </td>
                    <td className={styles.orderName} data-label="주문 상품 정보">{orderItem.product.productName}</td>
                    <td className={styles.orderPrice} data-label="상품가격">{orderItem.product.productDiscount.toLocaleString()}원</td>
                    <td className={styles.orderQuantity} data-label="수량">
                        <div className={styles.quantityContainer}>
                            {orderItem.quantity}
                        </div>
                    </td>
                    <td className={styles.orderTotal} data-label="합계">{(orderItem.product.productDiscount * orderItem.quantity).toLocaleString()}원</td>
                </tr>
            </tbody>
        </table>
        <div className={styles_m.mobileContainer}>
            <div className="checkBox">
                
            </div>

            <div>
                <img src={`./upload/${orderItem.product.productImgPath}`} alt="사진" style={{ width: 100, height: 100, borderRadius: 10}}/>
            </div>
            <div className={styles_m.orderInfo}>
                <div className={styles_m.orderName}>
                    {orderItem.product.productName}

                </div>

                <div className={styles_m.orderOption}>
                    옵션
                </div>
                <div className={styles_m.quantityContainer}>
                    수량: {orderItem.quantity}
                </div>
    
                <div className={styles_m.orderTotal}>{(orderItem.product.productDiscount * orderItem.quantity).toLocaleString()}원</div>
            </div>
        </div>
    </div>
  )
}
