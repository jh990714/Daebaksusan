import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CartItem, ProductList } from 'types';
import styles from './MyCartListComp.module.css'

interface CartItemCompProps {
    cartItem: CartItem;
    selectAll: boolean;
    onQuantityChange: (id: number, quantity: number) => void;
    onSelectedChange: (id: number, isSelected: boolean) => void;
  }

  export const MyCartListComp: React.FC<CartItemCompProps> = ({ cartItem, selectAll, onQuantityChange, onSelectedChange }) => {
    const [myCartItem, setCartItem] = useState(cartItem);
    const handleQuantityChange = (id: number, delta: number) => {
        const newQuantity = Math.max(1, myCartItem.quantity + delta);
        setCartItem(prevCartItem => ({
          ...prevCartItem,
          quantity: newQuantity,
        }));
        onQuantityChange(id, newQuantity);
    };

    const handleQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? NaN : parseInt(event.target.value, 10);
        if (event.target.value === '' || !isNaN(value) && value >= 0) {
            const newQuantity = isNaN(value) ? 0 : value;
            setCartItem(prevCartItem => ({
                ...prevCartItem,
                quantity: newQuantity,
            }));
            onQuantityChange(myCartItem.product.productId, newQuantity);
        }
      };
    
    const handleCheckboxChange = () => {
        const newSelected = !myCartItem.isSelected;
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            isSelected: newSelected,
        }));
        onSelectedChange(myCartItem.product.productId, newSelected);
    };

    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            isSelected: selectAll, // prop으로 받은 전체 선택 상태를 반영
        }));
    }, [selectAll]);
    
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
                        <th data-label="수량">수량</th>
                        <th data-label="합계">합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="칼럼명">
                        <input
                            type="checkbox"
                            checked={myCartItem.isSelected}
                            onChange={handleCheckboxChange}
                        />

                        </td>
                        <td className={styles.orderImg}  data-label="이미지">
                            <img src={`./upload/${myCartItem.product.productImgPath}`} alt="사진" style={{ width: 140, height: 140 }}></img>
                        </td>
                        <td className={styles.orderName} data-label="주문 상품 정보">{myCartItem.product.productName}</td>
                        <td className={styles.orderPrice} data-label="상품가격">{myCartItem.product.productDiscount.toLocaleString()}원</td>
                        <td className={styles.orderQuantity} data-label="수량">
                            <div className={styles.quantityContainer}>
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, -1)}>-</button>
                                <input
                                    type="text"
                                    value={myCartItem.quantity.toLocaleString()}
                                    onChange={handleQuantityInputChange}
                                    className={styles.quantityInput} // 수량 입력란 스타일을 적용하려면 CSS 모듈에 이 클래스를 추가해야 합니다.
                                />
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, 1)}>+</button>
                            </div>
                        </td>
                        <td className={styles.orderTotal} data-label="합계">{(myCartItem.product.productDiscount * myCartItem.quantity).toLocaleString()}원</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
