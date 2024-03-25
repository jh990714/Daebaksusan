import React, { useEffect, useState } from 'react'
import styles from './MyCartListComp.module.css';
import styles_m from './MyCartMobile.module.css';
import { Cart } from 'types';

interface CartItemCompProps {
    cartItem: Cart;
    selectAll: boolean;
    onQuantityChange: (id: number, quantity: number, box_cnt: number) => void;
    onSelectedChange: (id: number, isSelected: boolean) => void;
}


export const MyCartListComp: React.FC<CartItemCompProps> = ({ cartItem, selectAll, onQuantityChange, onSelectedChange }) => {
    const [myCartItem, setCartItem] = useState(cartItem);

    const handleQuantityChange = (id: number, delta: number) => {
        const newQuantity = Math.min(Math.max(1, myCartItem.cartItem.quantity + delta), myCartItem.cartItem.product.stockQuantity);
        const newBoxcnt = Math.ceil(newQuantity / myCartItem.cartItem.product.maxQuantityPerDelivery);
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            cartItem: {
                ...prevCartItem.cartItem,
                quantity: newQuantity,
                box_cnt: newBoxcnt,
            },
        }));
        onQuantityChange(id, newQuantity, newBoxcnt);
    };

    const handleQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? NaN : parseInt(event.target.value, 10);
        if (event.target.value === '' || !isNaN(value) && value >= 0) {
            const newQuantity = Math.min(Math.max(1, isNaN(value) ? 0 : value), myCartItem.cartItem.product.stockQuantity);
            const newBoxcnt = Math.ceil(newQuantity / myCartItem.cartItem.product.maxQuantityPerDelivery);
            setCartItem(prevCartItem => ({
                ...prevCartItem,
                cartItem: {
                    ...prevCartItem.cartItem,
                    quantity: newQuantity,
                    box_cnt: newBoxcnt,
                },
            }));
            onQuantityChange(myCartItem.id, newQuantity, newBoxcnt);
        }
    };

    const handleCheckboxChange = () => {
        const newSelected = !myCartItem.isSelected;
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            isSelected: newSelected,
        }));
        onSelectedChange(myCartItem.id, newSelected);
    };

    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            isSelected: selectAll, // prop으로 받은 전체 선택 상태를 반영
        }));
    }, [selectAll]);

    const calculateItemTotal = (item: Cart) => {
        const product = item.cartItem.product;
        const quantity = item.cartItem.quantity;
        const boxCount = item.cartItem.box_cnt;
        const optionPrice = boxCount * item.cartItem.selectedOption.addPrice;
        const shippingCost = boxCount * product.shippingCost;
        const itemPrice = (product.regularPrice - product.salePrice) * quantity;
        const totalPrice = itemPrice + optionPrice + shippingCost;
        return totalPrice.toLocaleString();
    };


    return (
        <div className={styles.myCartListComp}>
            <table>
                <colgroup>
                    <col width="30px"></col>
                    <col width="140px"></col>
                    <col></col>
                    <col width="150px"></col>
                    <col width="150px"></col>
                    <col width="150px"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th data-label="칼럼명"></th>
                        <th data-label="이미지"></th>
                        <th data-label="주문 상품 정보">주문 상품 정보</th>
                        <th data-label="상품가격">상품가격</th>
                        <th data-label="수량" style={{ textAlign: 'center' }}>수량</th>
                        <th data-label="가격정보">가격정보</th>
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
                        <td className={styles.orderImg} data-label="이미지">
                            <img src={`./upload/${myCartItem.cartItem.product.imageUrl}`} alt="사진" style={{ width: 140, height: 140 }}></img>
                        </td>
                        <td className={styles.orderName} data-label="주문 상품 정보">
                            <p className={styles.title}>{myCartItem.cartItem.product.name}</p>
                            <p className={styles.option}>{myCartItem.cartItem.selectedOption.name} + {myCartItem.cartItem.selectedOption.addPrice}</p>
                        </td>
                        <td className={styles.orderPrice} data-label="상품가격">

                            {(myCartItem.cartItem.product.regularPrice - myCartItem.cartItem.product.salePrice).toLocaleString()}원

                        </td>
                        <td className={styles.orderQuantity} data-label="수량">
                            <div className={styles.quantityContainer}>
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.id, -1)}>-</button>
                                <input
                                    type="text"
                                    value={myCartItem.cartItem.quantity.toLocaleString()}
                                    onChange={handleQuantityInputChange}
                                    className={styles.quantityInput}
                                />
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(myCartItem.id, 1)}>+</button>
                            </div>
                        </td>
                        <td data-label="가격정보" className={styles.priceInfo}>
                            <p>박스 개수: {myCartItem.cartItem.box_cnt}</p>
                            <p>옵션 가격: {(myCartItem.cartItem.box_cnt * myCartItem.cartItem.selectedOption.addPrice).toLocaleString()}원</p>
                            <p>배송비: {(myCartItem.cartItem.box_cnt * myCartItem.cartItem.product.shippingCost).toLocaleString()}원</p>
                        </td>
                        <td data-label="합계">
                            <p className={styles.orderTotal}>{calculateItemTotal(myCartItem)}원</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles_m.mobileContainer}>
                <div className="checkBox">
                    <input
                        type="checkbox"
                        checked={myCartItem.isSelected}
                        onChange={handleCheckboxChange}
                        className={styles_m.custom_checkbox} // CSS 클래스 추가
                    />
                    <label htmlFor={myCartItem.cartItem.product.productId.toString()} className={styles_m.checkbox_icon}></label> {/* label에 클래스 추가 */}
                </div>

                <div className={styles_m.orderImg}>
                    <img src={`./upload/${myCartItem.cartItem.product.imageUrl}`} alt="사진" style={{ width: 200, height: 200, borderRadius: 10 }} />
                </div>
                <div className={styles_m.orderInfo}>
                    <div className={styles_m.orderName}>
                        {myCartItem.cartItem.product.name}
                    </div>

                    <div className={styles_m.orderOption}>
                        옵션
                    </div>
                    <div className={styles_m.quantityContainer}>
                        <button className={styles_m.quantityButton} onClick={() => handleQuantityChange(myCartItem.id, -1)}>-</button>
                        <input
                            type="text"
                            value={myCartItem.cartItem.quantity.toLocaleString()}
                            onChange={handleQuantityInputChange}
                            className={styles_m.quantityInput}
                        />
                        <button className={styles_m.quantityButton} onClick={() => handleQuantityChange(myCartItem.id, 1)}>+</button>
                    </div>

                    <div className={styles_m.orderTotal}>
                        <div className={styles_m.priceInfo}>
                            <p>박스 개수: {myCartItem.cartItem.box_cnt}</p>
                            <p>옵션 가격: {(myCartItem.cartItem.box_cnt * myCartItem.cartItem.selectedOption.addPrice).toLocaleString()}원</p>
                            <p>배송비: {(myCartItem.cartItem.box_cnt * myCartItem.cartItem.product.shippingCost).toLocaleString()}원</p>
                            <p className={styles_m.total}>합계 : {calculateItemTotal(myCartItem)}원</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
