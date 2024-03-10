import React, { useEffect, useState } from 'react'
import styles from './MyCart.module.css'
import { CartItem, ProductList } from 'types';
import axios from 'axios';
import { MyCartListComp } from 'components/MyCartListComp';

export const MyCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [selectAll, setSelectAll] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get<ProductList[]>('http://175.215.44.128:8080/product');
            const cartItems = response.data.map(product => ({
                product,
                isSelected: true,
                quantity: 1,
            }));
            setCartItems(cartItems);

            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        // cartItems가 변경될 때마다 전체 선택 상태를 업데이트합니다.
        const updateSelectAll = cartItems.every(item => item.isSelected);
        setSelectAll(updateSelectAll);
    }, [selectAll]);

    const toggleSelectAll = () => {
        const newCartItems = cartItems.map(item => ({
          ...item,
          isSelected: !selectAll, // 전체 선택 상태를 반전시킵니다.
        }));
        setCartItems(newCartItems);
        setSelectAll(!selectAll);
    };

    const calculateTotal = () => {
        return cartItems
          .filter(item => item.isSelected)
          .reduce((total, item) => total + (item.product.productDiscount * item.quantity), 0).toLocaleString();
    };
    const total = calculateTotal();

  return (
    <div className={styles.myCartContainer}>
        <div className={styles.selectAllContainer}>
            <label>
            <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
            />
                전체 선택
            </label>
        </div>
        <div className={styles.myCartPath}>
            <ul>
                <li>홈</li>
                <li>마이페이지</li>
                <li>장바구니</li>
            </ul>
        </div>

        <ul className={styles.cartItemList}>
            {cartItems.map((cartItem: CartItem) => (
                <li key={cartItem.product.productId}>
                    <MyCartListComp cartItem={cartItem} selectAll={selectAll} />
                </li>
            ))}
        </ul>
        
        <div className={styles.orderContainer}>
            <ul>
                <li>
                    <div className={styles.priceTitle}>총 상품 합계 금액</div>
                    <div className={styles.price}>{total.toLowerCase()}원</div>
                </li>
                <li>
                    <div className={styles.priceTitle}>배송비 합계 금액</div>
                    <div className={styles.price}>0원</div>
                </li>
                <li>
                    <div className={styles.priceTitle}>총 주문 합계 금액</div>
                    <div className={styles.price}>{total.toLowerCase()}원</div>
                </li>
            </ul>
        </div>
        
    </div>
  )
}
