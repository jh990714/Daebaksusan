import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './QuickCart.module.css';

import topArrow from '../assets/topArrow.png';
import bottomArrow from '../assets/bottomArrow.png';
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';
import cartBlueIcon from '../assets/cartBlue.png';

import { ProductListComp } from 'components/product/ProductListComp';
import { Cart, CartItem } from 'types';
import { Link } from 'react-router-dom';
import { fetchCartItemsDelete, fetchCartItems } from 'utils/cartUtils';
import { useCart } from 'hook/CartProvider';
import { useAuthContext } from 'hook/AuthProvider';

export const QuickCart = () => {
    // 전역 상태 훅 사용
    const { cartItems, setCartItems } = useCart();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();

    // 로컬 상태 관리
    const [isVisible, setIsVisible] = useState(false);
    const [buttonImage, setButtonImage] = useState(topArrow);
    const [startIndex, setStartIndex] = useState(0);
    const location = useLocation();

    // 선택된 상품만 필터링
    const filteredCartItems = cartItems.filter(item => item.isSelected);

    // 페이지 이동 시 장바구니 닫기
    useEffect(() => {
        setIsVisible(false);
        setButtonImage(topArrow);
    }, [location]);

    // 로그인 상태에 따라 장바구니 항목 가져오기
    useEffect(() => {
        fetchCartItems(setCartItems, setIsLoggedIn);
    }, [isLoggedIn]);

    // 버튼 클릭 시 장바구니 표시/숨기기
    const handelClick = () => {
        setIsVisible(!isVisible);
        setButtonImage(isVisible ? topArrow : bottomArrow);
    };

    // 이전 상품 목록으로 이동
    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prevIndex => prevIndex - 1);
        }
    };

    // 다음 상품 목록으로 이동
    const handleNext = () => {
        if (startIndex < cartItems.length - 5) {
            setStartIndex(prevIndex => prevIndex + 1);
        }
    };

    // 개별 상품 선택 상태 변경
    const handleSelectChange = (id: number) => {
        const updatedItems = cartItems.map(item => {
            if (item.cartId === id) {
                return { ...item, isSelected: !item.isSelected };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    // 총 주문 금액 계산
    const calculateTotal = () => {
        return cartItems
            .filter(item => item.isSelected)
            .reduce((total, item) => {
                const optionPrice = item.cartItem.boxCnt * item.cartItem.option!.addPrice;
                const itemTotal = (item.cartItem.product.regularPrice - item.cartItem.product.salePrice) * item.cartItem.quantity;
                const shippingCost = item.cartItem.boxCnt * item.cartItem.product.shippingCost;
                return total + itemTotal + shippingCost + optionPrice;
            }, 0)
            .toLocaleString();
    };

    // 수량 변경 처리
    const handleQuantityChange = (id: number, delta: number) => {
        const updatedItems = cartItems.map(item => {
            if (item.cartId === id) {
                const newQuantity = Math.min(
                    Math.max(1, item.cartItem.quantity + delta),
                    item.cartItem.product.stockQuantity
                );
                const newBoxcnt = Math.ceil(newQuantity / item.cartItem.product.maxQuantityPerDelivery);
                return { ...item, cartItem: { ...item.cartItem, quantity: newQuantity, boxCnt: newBoxcnt } };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    // 전체 선택 또는 선택 해제
    const selectAll = () => {
        const areAllSelected = cartItems.every(item => item.isSelected);
        const updatedItems = cartItems.map(item => ({
            ...item,
            isSelected: !areAllSelected,
        }));
        setCartItems(updatedItems);
        setStartIndex(0);
    };

    // 선택된 상품 삭제
    const selectDelete = async () => {
        fetchCartItemsDelete(cartItems, setCartItems, setIsLoggedIn);
        setStartIndex(0);
    };

    // 상품 목록 렌더링
    const renderListItems = () => {
        return cartItems.slice(startIndex, startIndex + 4).map(item => (
            <li key={item.cartId}>
                <div className={styles.cartItemContainer}>
                    <span className={styles.checkboxContainer}>
                        <input
                            id={`checkbox-${item.cartId}`}
                            type="checkbox"
                            className={styles.customCheckbox}
                            checked={item.isSelected}
                            onChange={() => handleSelectChange(item.cartId)}
                        />
                    </span>
                    <div className={styles.productListContainer}>
                        <ProductListComp product={item.cartItem.product} fontSize="text-xs" />
                        <div className={styles.option}>
                            - {item.cartItem.option!.name} + {item.cartItem.option!.addPrice}
                        </div>
                        <div className={styles.quantityContainer}>
                            <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.cartId, -1)}>-</button>
                            {item.cartItem.quantity}
                            <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.cartId, 1)}>+</button>
                        </div>
                    </div>
                </div>
            </li>
        ));
    };

    return (
        <div className={styles.quickCartBar}>
            <img className={styles.btnQuickCart} onClick={handelClick} src={buttonImage} alt="버튼 이미지" />
            <div className={`${styles.quickCartContainer} ${isVisible ? styles.show : ''}`}>
                <div className={`${styles.quickCartOff} ${!isVisible ? styles.show : styles.hidden}`}>
                    <img src={cartBlueIcon} alt="" style={{ width: 35, height: 'auto' }} />
                    <div className="ml-2">간편 장바구니</div>
                </div>
                <div className={styles.quickCartOn}>
                    {cartItems.length > 0 ? (
                        <div className={styles.cartListContainer}>
                            <div className={styles.moveButton}>
                                <img width="35" height="35" src={leftArrow} onClick={handlePrev} />
                            </div>
                            <div className={styles.cartList}>
                                <ul className={styles.productList}>{renderListItems()}</ul>
                            </div>
                            <div className={styles.moveButton}>
                                <img width="35" height="35" src={rightArrow} onClick={handleNext} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyCartMessage}>장바구니에 상품이 없습니다</div>
                    )}
                    <div className={styles.totalPriceContainer}>
                        <div className={styles.totalPriceTitle}>장바구니 총 주문 금액</div>
                        <div className={styles.totalPrice}>{calculateTotal()}원</div>
                        <div className={styles.quickCartBtns}>
                            {filteredCartItems.length > 0 ? (
                                <Link to="/order" state={{ cartItems: filteredCartItems }} style={{ textDecoration: 'none' }}>
                                    <div className={styles.quickOrderbutton}>구매하러 가기</div>
                                </Link>
                            ) : (
                                <div className={styles.quickOrderbutton}>구매하러 가기</div>
                            )}
                            <div>
                                <div className={styles.quickCartbutton} onClick={selectAll}>
                                    모두 선택 / 해제
                                </div>
                            </div>
                            <div>
                                <div className={styles.quickCartbutton} onClick={selectDelete}>
                                    선택 상품 삭제
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
