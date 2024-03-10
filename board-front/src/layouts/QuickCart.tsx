import React, { useEffect, useState } from 'react'
import styles from './QuickCart.module.css'
import topArrow from '../assets/topArrow.png'
import bottomArrow from '../assets/bottomArrow.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import { ProductListComp } from 'components/ProductListComp'
import axios from 'axios'
import { ProductList } from 'types'
import { Link } from 'react-router-dom'


interface CartItem {
  product: ProductList;
  isSelected: boolean; // 체크박스 선택 상태
  quantity: number;
}

export const QuickCart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonImage, setButtonImage] = useState(topArrow);
  const [startIndex, setStartIndex] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([])

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

  
  const handelClick = () => {
    setIsVisible(!isVisible);
    setButtonImage(isVisible ? topArrow : bottomArrow );

  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < cartItems.length - 4) { // 다음 아이템이 있을 경우에만 인덱스 증가
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSelectChange = (id: number) => {
    
    const updatedItems = cartItems.map(item => {
        if (item.product.productId === id) {
          console.log('true');
            return { ...item, isSelected: !item.isSelected };
        } else {
          console.log('false');
          return item;
        }
    });
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.isSelected)
      .reduce((total, item) => total + (item.product.productDiscount * item.quantity), 0).toLocaleString();
  };
  
  const handleQuantityChange = (id: number, delta: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.product.productId === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 }; // 수량은 최소 1 이상
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

  const selectDelete = () => {
    // isSelected가 false인 항목들만 필터링하여 남깁니다.
    const remainingItems = cartItems.filter(item => !item.isSelected);
    // 남은 항목들로 cartItems 상태를 업데이트합니다.
    const updatedItems = remainingItems.map(item => ({ ...item, isSelected: true }));
    setCartItems(updatedItems);
    setStartIndex(0);
  };

  const renderListItems = () => {
    return cartItems.slice(startIndex, startIndex + 4).map((item, index) => (
      <div className={styles.cartItemContainer}>
        <li key={item.product.productId}>
          <ProductListComp product={item.product} />
        </li>

        <div className={styles.quantityContainer}>
          <div>
            <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.product.productId, -1)}>-</button>
            {item.quantity}
            <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.product.productId, 1)}>+</button>
          </div>

          <div className={styles.checkboxContainer}>
            <input
              id={`checkbox-${item.product.productId}`}
              type="checkbox"
              className={styles.customCheckbox}
              checked={item.isSelected}
              onChange={() => handleSelectChange(item.product.productId)}
            />
            <label htmlFor={`checkbox-${item.product.productId}`} className={styles.checkboxLabel}></label>
          </div>
        </div>
      </div>
    ));
  };


  return (
    <div className={styles.quickCartBar}>
      <img className={styles.btnQuickCart} onClick={handelClick} src={buttonImage} alt="버튼 이미지" width="60" height="60" />
      {isVisible && (
        <div className={styles.quickCartOn}>

          {cartItems.length > 0 ? (
            <div className={styles.cartListContainer}>
              <div className={styles.moveButton}>
                <img width="35" height="35" src={leftArrow} onClick={handlePrev}/>
              </div>

              <div className={styles.cartList}>
                <ul className={styles.productList}>
                  {renderListItems()}
                </ul>
                
              </div>
              <div className={styles.moveButton}>
                <img width="35" height="35" src={rightArrow} onClick={handleNext}/>
              </div>
            </div>
          ) : (
            <div className={styles.emptyCartMessage}>
              장바구니에 상품이 없습니다
            </div>
          )}


          <div className={styles.totalPriceContainer}>
            <div className={styles.totalPriceTitle}>장바구니 총 주문 금액</div>
            <span className={styles.totalPrice}>{calculateTotal()}</span>원
            <div>
              <Link to='' className={styles.quickOrderbutton}> 구매하러 가기 </Link>
            </div>

            <div className={styles.quickCartBtns}>
              <div>
                <div className={styles.quickCartbutton} onClick={selectAll}> 모두 선택 / 해제 </div>
              </div>
              <div>
                <div className={styles.quickCartbutton} onClick={selectDelete}> 선택 상품 삭제 </div>
              </div>
              </div>
          </div>
          
        </div>
      )}
      {!isVisible && (
        <div className={styles.quickCartOff}>
          간편 장바구니
        </div>
      )}

    </div>
  );
};
