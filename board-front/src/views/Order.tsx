import React, { useEffect, useState } from 'react';
import DaumPost from 'components/DaumPost';
import { OrderFlow } from 'components/OrderFlow';
import './Order.css';
import { useLocation } from 'react-router-dom';
import { CartItem } from 'types';
import { OrderItemListComp } from 'components/OrderItemListComp';

interface AddressObj {
    areaAddress: string;
    townAddress: string;
    zip: string; // zip 속성 추가
  }

export const Order: React.FC = () => {
    const orderItems = useLocation().state.cartItems;
    const totalPrice: number = orderItems.reduce((accumulator: number, orderItem: CartItem) => {
        return accumulator + orderItem.product.productDiscount * orderItem.quantity;
    }, 0); 

    const [addressObj, setAddressObj] = useState<AddressObj>({
        areaAddress: '',
        townAddress: '',
        zip: ''  // 우편번호 상태 추가
    });
    const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

    return (
        <div className='orderContainer'>
            <OrderFlow currentStep={2}/>
            <div className='orderItems'>
                <div className='orderTitle'> 구매 상품 </div>
                <div className='scrollableList'>
                    <ul>
                        {orderItems.map((cartItem: CartItem) => (
                            <li key={cartItem.product.productId}>
                                <OrderItemListComp orderItem={cartItem}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='totalPriceContainer'>
                <ul>
                    <li>
                        <div className='priceTitle'>총 상품 합계 금액</div>
                        <div className='price'>{totalPrice.toLocaleString()}원</div>
                    </li>

                    <li>
                        <div className='op'>+</div>
                    </li>

                    <li>
                        <div className='priceTitle'>배송비 합계 금액</div>
                        <div className='price'>0원</div>
                    </li>

                    <li>
                        <div className='op'>=</div>
                    </li>

                    <li>
                        <div className='priceTitle'>총 주문 합계 금액</div>
                        <div className='price'>{totalPrice.toLocaleString()}원</div>
                    </li>
                </ul>
            </div>

            <div className='orderTitle'> 배송정보 </div>
            <div className='orderInfo'>
                <div className='orderInfoTitle'> 주문자 정보 </div>
                <input
                    type='text'
                    className='userName'
                    placeholder='주문자'
                    title='주문자'
                    id='ordererName'
                />
                <div className='orderPhonNum'>
                    <select
                        className={'phoneNumFirst'}
                        title=''
                        id='ordererPhoneFist'
                    >
                        <option>010</option>
                        <option>011</option>
                        <option>016</option>
                        <option>017</option>
                        <option>018</option>
                        <option>019</option>
                    </select>
                        
                    <input
                        type='text'
                        className='phoneNum'
                        placeholder='휴대전화 앞자리'
                        title='주문자명'
                        id='ordererPhoneMid'
                    />
                    <input
                        type='text'
                        className='phoneNum'
                        placeholder='휴대전화 뒷자리'
                        title='주문자명'
                        id='ordererPhoneLast'
                    />
                </div>    
            </div>

            <div className='orderInfo'>
                <div className='orderInfoTitle'> 배송 정보 </div>
                <input
                    type='text'
                    className='userName'
                    placeholder='받는 사람'
                    title='받는 사람'
                    id='receiverName'
                />
                <div className='orderPhonNum'>
                    <select
                        className={'phoneNumFirst'}
                        title=''
                        id='receiverPhoneFirst'
                    >
                        <option>010</option>
                        <option>011</option>
                        <option>016</option>
                        <option>017</option>
                        <option>018</option>
                        <option>019</option>
                    </select>
                        
                    <input
                        type='text'
                        className='phoneNum'
                        placeholder='휴대전화 앞자리'
                        title='휴대전화 앞자리'
                        maxLength={4}
                        id='receiverPhoneMid'
                    />
                    <input
                        type='text'
                        className='phoneNum'
                        placeholder='휴대전화 뒷자리'
                        title='휴대전화 뒷자리'
                        maxLength={4}
                        id='receiverPhoneLast'
                    />
                </div>

                <div className='addressContainer'>
                    <DaumPost setAddressObj={setAddressObj} postcodeScriptUrl={postcodeScriptUrl} />
                    <input
                        type='text'
                        className='address'
                        placeholder='우편 번호'
                        title='우편 번호'
                        id='receiverPhoneLast'
                        value={addressObj.zip}
                        readOnly
                    />
                    <input
                        type='text'
                        className='address'
                        placeholder='주소'
                        title='주소'
                        id='receiverPhoneLast'
                        value={`${addressObj.areaAddress}${addressObj.townAddress}`}
                        readOnly
                    />
                    <input
                        type='text'
                        className='address'
                        placeholder='상세 주소'
                        title='상세 주소'
                        id='receiverPhoneLast'
                    />
                </div>

            </div>

    
            {/* 주소 정보 출력 */}

            
        </div>
    );
};
