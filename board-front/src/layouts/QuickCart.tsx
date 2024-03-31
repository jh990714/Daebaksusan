import { useEffect, useMemo, useState } from 'react';
import styles from './QuickCart.module.css';
import topArrow from '../assets/topArrow.png';
import bottomArrow from '../assets/bottomArrow.png';
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';
import { ProductListComp } from 'components/product/ProductListComp';
import { Cart, CartItem } from 'types';
import { Link } from 'react-router-dom';
import { fetchCartItemsDelete, fetchCartItems } from 'utils/cartUtils';
import { useCart } from 'hook/CartProvider';
import { useAuthContext } from 'hook/AuthProvider';

export const QuickCart = () => {
    const {cartItems,  setCartItems} = useCart();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [isVisible, setIsVisible] = useState(false);
    const [buttonImage, setButtonImage] = useState(topArrow);
    const [startIndex, setStartIndex] = useState(0);
    // const [cartItems, setCartItems] = useState<Cart[]>([]);

    const filteredCartItems = cartItems.filter(item => item.isSelected === true);

    useEffect(() => {
        fetchCartItems(setCartItems, setIsLoggedIn);
    }, [isLoggedIn]);


    const handelClick = () => {
        setIsVisible(!isVisible);
        setButtonImage(isVisible ? topArrow : bottomArrow);
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (startIndex < cartItems.length - 5) {
            setStartIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleSelectChange = (id: number) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, isSelected: !item.isSelected };
            } else {
                return item;
            }
        });
        setCartItems(updatedItems);
    };

    const calculateTotal = () => {
        return cartItems
            .filter(item => item.isSelected)
            .reduce((total, item) => {

                const optionPrice = item.cartItem.box_cnt * item.cartItem.selectedOption!.addPrice

                const itemTotal = (item.cartItem.product.regularPrice - item.cartItem.product.salePrice) * item.cartItem.quantity;

                const shippingCost = item.cartItem.box_cnt * item.cartItem.product.shippingCost;
                return total + itemTotal + shippingCost + optionPrice;
            }, 0)
            .toLocaleString();
    };

    const handleQuantityChange = (id: number, delta: number) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.min(Math.max(1, item.cartItem.quantity + delta), item.cartItem.product.stockQuantity);
                const newBoxcnt = Math.ceil(newQuantity / item.cartItem.product.maxQuantityPerDelivery);
                console.log(Math.ceil(newQuantity / item.cartItem.product.maxQuantityPerDelivery))

                return { ...item, cartItem: { ...item.cartItem, quantity: newQuantity >= 1 ? newQuantity : 1, box_cnt: newBoxcnt } };
            } else {
                return item;
            }
        });
        setCartItems(updatedItems);
    };

    const selectAll = () => {
        const areAllSelected = cartItems.every(item => item.isSelected);
        const updatedItems = cartItems.map(item => ({
            ...item,
            isSelected: !areAllSelected,
        }));
        setCartItems(updatedItems);
        setStartIndex(0);
    };

    const selectDelete = async () => {

        fetchCartItemsDelete(cartItems, setCartItems, setIsLoggedIn)
        setStartIndex(0);
    };
    

    const renderListItems = () => {
        return cartItems.slice(startIndex, startIndex + 5).map((item, index) => (
            <div className={styles.cartItemContainer}>
                <span className={styles.checkboxContainer}>
                    <input
                        id={`checkbox-${item.id}`}
                        type="checkbox"
                        className={styles.customCheckbox}
                        checked={item.isSelected}
                        onChange={() => handleSelectChange(item.id)}
                    />
                </span>
                <div>
                    <li key={item.id}>
                        <ProductListComp product={item.cartItem.product} size='110px' fontSize='4px' />
                    </li>
                    <div className={styles.option}> - {item.cartItem.selectedOption!.name} + {item.cartItem.selectedOption!.addPrice}</div>
                    <div className={styles.quantityContainer}>
                        <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        {item.cartItem.quantity}
                        <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className={styles.quickCartBar}>
            <img className={styles.btnQuickCart} onClick={handelClick} src={buttonImage} alt="버튼 이미지" />
            <div className={`${styles.quickCartContainer} ${isVisible ? styles.show : ''}`}>
                <div className={`${styles.quickCartOff} ${!isVisible ? styles.show : styles.hidden}`}>
                    간편 장바구니
                </div>
                <div className={styles.quickCartOn}>
                    {cartItems.length > 0 ? (
                        <div className={styles.cartListContainer}>
                            <div className={styles.moveButton}>
                                <img width="35" height="35" src={leftArrow} onClick={handlePrev} />
                            </div>
                            <div className={styles.cartList}>
                                <ul className={styles.productList}>
                                    {renderListItems()}
                                </ul>
                            </div>
                            <div className={styles.moveButton}>
                                <img width="35" height="35" src={rightArrow} onClick={handleNext} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyCartMessage}>
                            장바구니에 상품이 없습니다
                        </div>
                    )}
                    <div className={styles.totalPriceContainer}>
                        <div className={styles.totalPriceTitle}>장바구니 총 주문 금액</div>
                        <div className={styles.totalPrice}>{calculateTotal()}원 </div>
                        <div className={styles.quickCartBtns}>
                            <Link to='/order' state={{ cartItems: filteredCartItems }} style={{ textDecoration: 'none' }}>
                                <div className={styles.quickOrderbutton}> 구매하러 가기</div>
                            </Link>
                            <div>
                                <div className={styles.quickCartbutton} onClick={selectAll}> 모두 선택 / 해제 </div>
                            </div>
                            <div>
                                <div className={styles.quickCartbutton} onClick={selectDelete}> 선택 상품 삭제 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
