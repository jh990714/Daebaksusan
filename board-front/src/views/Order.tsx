import React, { useEffect, useState } from 'react';
import DaumPost from 'components/DaumPost';
import { OrderFlow } from 'components/OrderFlow';
import './Order.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddressObj, Cart, CartItem, InputErrors, OrdererInfo,   } from 'types';
import { OrderItemListComp } from 'components/product/OrderItemListComp';
import sendRequestWithToken from 'apis/sendRequestWithToken';
import { useAuthContext } from 'hook/AuthProvider';

declare const window: typeof globalThis & {
    IMP: any;
};

  // 입력 필드의 유효성 상태를 관리할 상태의 타입을 정의합니다.
export const Order: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [ordererName, setOrdererName] = useState<string>('');
    const [ordererPhoneMid, setOrdererPhoneMid] = useState<string>('');
    const [ordererPhoneLast, setOrdererPhoneLast] = useState<string>('');
    const [receiverName, setReceiverName] = useState<string>('');
    const [receiverPhoneMid, setReceiverPhoneMid] = useState<string>('');
    const [receiverPhoneLast, setReceiverPhoneLast] = useState<string>('');
    const { IMP } = window; // 아임포트 라이브러리 추출
    const [addressObj, setAddressObj] = useState<AddressObj>({
        address: '',
        zip: '',
        details: ''
    });

    const url = '/info';
    const post = 'GET';
    const data = null;
    const navigate = useNavigate();
    const [ordererInfo, setOrdererInfo] = useState<OrdererInfo>();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);
                
                setOrdererInfo(response);
                if (response) {
                    const { name, phone, postalCode, address, detailAddress } = response;

                    const [phoneFirst, phoneMid, phoneLast] = phone.split('-');

                    setOrdererName(name || '');
                    setOrdererPhoneMid(phoneMid || '');
                    setOrdererPhoneLast(phoneLast || '');
                    setAddressObj({
                        address: address,
                        zip: postalCode,
                        details: detailAddress
                    });
                    
                    
                }
                
            } catch (error) {
                console.error('비회원 주문', error);
            }
        };

        fetchData();
    }, []);

    const [inputErrors, setInputErrors] = useState<InputErrors>({
        ordererName: false,
        ordererPhoneMid: false,
        ordererPhoneLast: false,
        receiverName: false,
        receiverPhoneMid: false,
        receiverPhoneLast: false,
        address: false,
        zip: false,
      });

   
    const orderItems = useLocation().state.cartItems;
    const totalPrice: number = orderItems.reduce((total: number, orderItem: Cart) => {
        const itemPrice = (orderItem.cartItem.product.regularPrice - orderItem.cartItem.product.salePrice) * orderItem.cartItem.quantity;
        const optionCost = orderItem.cartItem.box_cnt * orderItem.cartItem.selectedOption!.addPrice;


        return total + itemPrice + optionCost;
    }, 0); 

    const totalShippingCost: number = orderItems.reduce((total: number, orderItem: Cart) => {
        const shippingCost =orderItem.cartItem.box_cnt * orderItem.cartItem.product.shippingCost;
        return total + shippingCost;
    }, 0); 


    
    const handlePayment = () => {
        const errors: InputErrors = {
            ordererName: !ordererName,
            ordererPhoneMid: !ordererPhoneMid,
            ordererPhoneLast: !ordererPhoneLast,
            receiverName: !receiverName,
            receiverPhoneMid: !receiverPhoneMid,
            receiverPhoneLast: !receiverPhoneLast,
            address: !addressObj.address,
            zip: !addressObj.zip
        };
    
        setInputErrors(errors); // 유효성 상태 업데이트
    
        // 모든 필드가 유효한지 검사
        if (Object.values(errors).some(isInvalid => isInvalid)) {
          alert('모든 정보를 입력해주세요.');
          return;
        }
        
        // requestPay();
        var IMP = window.IMP;
        IMP.init('imp02022068'); // iamport 가맹점 식별코드
        const paymentData = {
            pg: 'nice',
            pay_method: "card",
            merchant_uid: new Date().getTime(),// 상점에서 관리하는 주문 번호
            name: '테스트 상품',
            amount: totalPrice + totalShippingCost,
            buyer_email: 'test@naver.com',
            buyer_name: '코드쿡',
            buyer_tel: '010-1234-5678',
            buyer_addr: addressObj.address + addressObj.details,
            buyer_postcode: addressObj.zip,
        };
    
        IMP.request_pay(paymentData, function (rsp: any) {
            console.log(rsp)
            if (rsp.success) {
                alert('결제 성공');;
            } else {
                alert('결제 실패');
            }
        });

      };

    // 입력 필드 변경 시 에러 상태를 해제하는 함수
    const handleChange = (field: string, value:string) => {
        setInputErrors({
            ...inputErrors,
            [field]: false, // 현재 변경하는 필드의 에러 상태를 false로 설정
        });

        // 필드에 따라 상태 업데이트
        if (field === 'ordererName') {
            setOrdererName(value);
        } else if (field === 'ordererPhoneMid') {
            setOrdererPhoneMid(value);
        } else if (field === 'ordererPhoneLast') {
            setOrdererPhoneLast(value);
        } else if (field === 'receiverName') {
            setReceiverName(value);
        } else if (field === 'receiverPhoneMid') {
            setReceiverPhoneMid(value);
        } else if (field === 'receiverPhoneLast') {
            setReceiverPhoneLast(value);
        }
    }

    const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    

    // const subscribeItemClickHandler = (e: any) => {
    //     var IMP = window.IMP;
    //     IMP.init('imp02022068'); // iamport 가맹점 식별코드
    //     IMP.request_pay({
    //         pg: 'nice',
    //         pay_method: "card",
    //         merchant_uid: new Date().getTime(),// 상점에서 관리하는 주문 번호
    //         name: '테스트 상품',
    //         amount: totalPrice  + totalShippingCost,
    //         buyer_email: 'test@naver.com',
    //         buyer_name: '코드쿡',
    //         buyer_tel: '010-1234-5678',
    //         buyer_addr: addressObj.address + addressObj.details,
    //         buyer_postcode: addressObj.zip,
    //     }, function (rsp: any) {
    //         console.log(rsp)
    //         if (rsp.success) {
    //             alert('빌링키 발급 성공');
    //         } else {
    //             alert('빌링키 발급 실패');
    //         }
    //     });
    // }

    return (
        <div className='orderContainer'>
            
            <OrderFlow currentStep={2}/>

            <div className='orderTitle'> 배송정보 </div>
            <div className='orderInfo'>
                <div className='orderInfoTitle'> 주문자 정보 </div>
                <input
                    type='text'
                    className={`userName ${inputErrors.ordererName ? 'error' : ''}`}
                    placeholder='주문자'
                    title='주문자'
                    id='ordererName'
                    value={ordererName}
                    onChange={(e) => handleChange('ordererName', e.target.value)}
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
                        className={`phoneNum ${inputErrors.ordererPhoneMid ? 'error' : ''}`}
                        placeholder='휴대전화 앞자리'
                        title='휴대전화 앞자리'
                        id='ordererPhoneMid'
                        value={ordererPhoneMid}
                        maxLength={4}
                        onChange={(e) => handleChange('ordererPhoneMid', e.target.value)}
                    />
                    <input
                        type='text'
                        className={`phoneNum ${inputErrors.ordererPhoneLast ? 'error' : ''}`}
                        placeholder='휴대전화 뒷자리'
                        title='휴대전화 뒷자리'
                        id='ordererPhoneLast'
                        value={ordererPhoneLast}
                        maxLength={4}
                        onChange={(e) => handleChange('ordererPhoneLast', e.target.value)}
                    />
                </div>    
            </div>

            <div className='orderInfo'>
                <div className='orderInfoTitle'> 배송 정보 </div>
                <input
                    type='text'
                    className={`userName ${inputErrors.receiverName ? 'error' : ''}`}
                    placeholder='받는 사람'
                    title='받는 사람'
                    id='receiverName'
                    value={receiverName}
                    onChange={(e) => handleChange('receiverName', e.target.value)}
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
                        className={`phoneNum ${inputErrors.receiverPhoneMid ? 'error' : ''}`}
                        placeholder='휴대전화 앞자리'
                        title='휴대전화 앞자리'
                        maxLength={4}
                        id='receiverPhoneMid'
                        value={receiverPhoneMid}
                        onChange={(e) => handleChange('receiverPhoneMid', e.target.value)}
                    />
                    <input
                        type='text'
                        className={`phoneNum ${inputErrors.receiverPhoneLast ? 'error' : ''}`}
                        placeholder='휴대전화 뒷자리'
                        title='휴대전화 뒷자리'
                        maxLength={4}
                        id='receiverPhoneLast'
                        value={receiverPhoneLast}
                        onChange={(e) => handleChange('receiverPhoneLast', e.target.value)}
                    />
                </div>

                <div className='addressContainer'>
                    <DaumPost addressObj={addressObj} setAddressObj={setAddressObj} postcodeScriptUrl={postcodeScriptUrl} inputErrors={inputErrors} setInputErrors={setInputErrors}/>
                </div>

                <div className='orderItems'>
                    <div className='orderTitle'> 구매 상품 </div>
                    <div className='scrollableList'>
                        <ul>
                            {orderItems.map((cartItem: Cart) => (
                                <li key={cartItem.cartItem.product.productId}>
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
                            <div className='price'>{totalShippingCost.toLocaleString()}원</div>
                        </li>

                        <li>
                            <div className='op'>=</div>
                        </li>

                        <li>
                            <div className='priceTitle'>총 주문 합계 금액</div>
                            <div className='price'>{(totalPrice  + totalShippingCost).toLocaleString()}원</div>
                        </li>
                    </ul>
                    <div className='paymentContainer'>
                        <button className='paymentButton' onClick={handlePayment} >결제하기</button>
                    </div>
                </div>


            </div>
       
        </div>
    );
};
