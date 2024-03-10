import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CartItem, ProductList } from 'types';
import styles from './MyCartListComp.module.css'

interface CartItemCompProps {
    cartItem: CartItem;
  }

  export const MyCartListComp: React.FC<CartItemCompProps & { selectAll: boolean }> = ({ cartItem, selectAll }) => {
    const [myCartItem, setCartItem] = useState(cartItem);
    const handleQuantityChange = (id: number, delta: number) => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            quantity: Math.max(1, myCartItem.quantity + delta),
        }));
        
        console.log(myCartItem);
      };

    const handleCheckboxChange = () => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            isSelected: !prevCartItem.isSelected,
        }));
        
        console.log(myCartItem);
    };

    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            isSelected: selectAll, // prop으로 받은 전체 선택 상태를 반영
        }));
    }, [selectAll]);
      
    return (
        <div className={styles.myCarListComp}>
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
                        <th data-label="이미지">a</th>
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
                        <td data-label="이미지">
                            <img src={`./upload/${myCartItem.product.productImgPath}`} alt="사진" style={{ width: 140, height: 140 }}></img>
                        </td>
                        <td data-label="주문 상품 정보">{myCartItem.product.productName}</td>
                        <td data-label="상품가격">{myCartItem.product.productDiscount.toLocaleString()}</td>
                        <td data-label="수량">
                            <div>
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, -1)}>-</button>
                                    {myCartItem.quantity.toLocaleString()}
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, 1)}>+</button>
                            </div>
                        </td>
                        <td data-label="합계">{(myCartItem.product.productDiscount * myCartItem.quantity).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
