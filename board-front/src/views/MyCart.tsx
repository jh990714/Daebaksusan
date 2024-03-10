import React, { useEffect, useState } from 'react'
import styles from './MyCart.module.css'
import { CartItem, ProductList } from 'types';
import axios from 'axios';
import { MyCartListComp } from 'components/MyCartListComp';
import { OrderFlow } from 'components/OrderFlow';
import { Link } from 'react-router-dom';

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



    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
            item.product.productId === id ? { ...item, quantity } : item
            )
        );
    };
    
    const handleSelectedChange = (id: number, isSelected: boolean) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
            item.product.productId === id ? { ...item, isSelected } : item
            )
        );
    };

    const toggleSelectAll = () => {
        const newCartItems = cartItems.map(item => ({
          ...item,
          isSelected: !selectAll, // 전체 선택 상태를 반전시킵니다.
        }));
        setCartItems(newCartItems);
        setSelectAll(!selectAll);
    };

    const deleteSelectedItems = () => {
        const remainingItems = cartItems.filter(item => !item.isSelected);
        // 남은 항목들로 cartItems 상태를 업데이트합니다.
        // isSelected 상태를 재설정할 필요가 없으므로, 이 부분을 제거합니다.
        setCartItems(remainingItems);
    };

    const calculateTotal = () => {
        return cartItems
          .filter(item => item.isSelected)
          .reduce((total, item) => total + (item.product.productDiscount * item.quantity), 0).toLocaleString();
    };
    
    const total = calculateTotal();
    const filteredCartItems = cartItems.filter(item => item.isSelected === true);

  return (
    <div className={styles.myCartContainer}>
        <div className={styles.myCartPath}>
            <ul>
                <li>홈</li>
                <li>마이페이지</li>
                <li>장바구니</li>
            </ul>
        </div>

        <div className={styles.orderFlow}>
            <OrderFlow currentStep = {1}/>
        </div>
        <div className={styles.selectAllContainer}>
            <label>
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                />
                전체 선택
            </label>
            <button onClick={deleteSelectedItems} className={styles.deleteSelectedBtn}>선택상품 삭제</button>

        </div>

        <ul className={styles.cartItemList}>
            {cartItems.map((cartItem: CartItem) => (
                <li key={cartItem.product.productId}>
                    <MyCartListComp cartItem={cartItem} selectAll={selectAll} onQuantityChange={handleQuantityChange} onSelectedChange={handleSelectedChange}/>
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
                    <div className={styles.op}>+</div>
                </li>

                <li>
                    <div className={styles.priceTitle}>배송비 합계 금액</div>
                    <div className={styles.price}>0원</div>
                </li>

                <li>
                    <div className={styles.op}>=</div>
                </li>

                <li>
                    <div className={styles.priceTitle}>총 주문 합계 금액</div>
                    <div className={styles.price}>{total.toLowerCase()}원</div>
                </li>
            </ul>
            
            <Link to='/order' state={{ cartItems: filteredCartItems }} >
                <div className={styles.orderBtn}>
                    선택상품 주문하기
                </div>
            </Link>
        </div>
        

    </div>
  )
}
