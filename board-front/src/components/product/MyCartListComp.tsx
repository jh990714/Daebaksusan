import React, { useEffect, useState } from 'react'
import { CartItem } from 'types';
import styles from './MyCartListComp.module.css';
import styles_m from './MyCartMobile.module.css';

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
                        <th data-label="수량" style={{textAlign: 'center'}}>수량</th>
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
                            <img src={`./upload/${myCartItem.product.imageUrl}`} alt="사진" style={{ width: 140, height: 140 }}></img>
                        </td>
                        <td className={styles.orderName} data-label="주문 상품 정보">{myCartItem.product.name}</td>
                        <td className={styles.orderPrice} data-label="상품가격">{(myCartItem.product.regularPrice - myCartItem.product.salePrice).toLocaleString()}원</td>
                        <td className={styles.orderQuantity} data-label="수량">
                            <div className={styles.quantityContainer}>
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, -1)}>-</button>
                                <input
                                    type="text"
                                    value={myCartItem.quantity.toLocaleString()}
                                    onChange={handleQuantityInputChange}
                                    className={styles.quantityInput} 
                                />
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, 1)}>+</button>
                            </div>
                        </td>
                        <td data-label="합계">
                            <p className={styles.orderTotal}>{((myCartItem.product.regularPrice - myCartItem.product.salePrice) * myCartItem.quantity + myCartItem.product.shippingCost).toLocaleString()}원</p>
                            <p className={styles.shippingCostTotal}> 배송비 {myCartItem.product.shippingCost.toLocaleString()}원 포함 </p>
                        
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles_m.mobileContainer}>
                <div className="checkBox">
                    <input
                        id={myCartItem.product.productId.toString()}
                        type="checkbox"
                        checked={myCartItem.isSelected}
                        onChange={handleCheckboxChange}
                        className={styles_m.custom_checkbox} // CSS 클래스 추가
                    />
                    <label htmlFor={myCartItem.product.productId.toString()} className={styles_m.checkbox_icon}></label> {/* label에 클래스 추가 */}
                </div>

                <div className={styles_m.orderImg}>
                    <img src={`./upload/${myCartItem.product.imageUrl}`} alt="사진" style={{ width: 100, height: 100, borderRadius: 10}}/>
                </div>
                <div className={styles_m.orderInfo}>
                    <div className={styles_m.orderName}>
                        {myCartItem.product.name}
                    </div>

                    <div className={styles_m.orderOption}>
                        옵션
                    </div>
                    <div className={styles_m.quantityContainer}>
                        <button className={styles_m.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, -1)}>-</button>
                        <input
                            type="text"
                            value={myCartItem.quantity.toLocaleString()}
                            onChange={handleQuantityInputChange}
                            className={styles_m.quantityInput}
                        />
                        <button className={styles_m.quantityButton} onClick={() => handleQuantityChange(myCartItem.product.productId, 1)}>+</button>
                    </div>
        
                    <div className={styles_m.orderTotal}>
                        <p>{((myCartItem.product.regularPrice - myCartItem.product.salePrice) * myCartItem.quantity + myCartItem.product.shippingCost).toLocaleString()}원</p>
                        <p className={styles.shippingCostTotal}> 배송비 {myCartItem.product.shippingCost.toLocaleString()}원 포함 </p>
    
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
