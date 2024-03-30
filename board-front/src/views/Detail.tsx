import { DetailTabComp } from 'components/DetailTabComp';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Cart, CartItem, Option } from 'types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CONNREFUSED } from 'dns';
import Product from 'types/interface/product-item.interface';
import sendRequestWithToken from 'apis/sendRequestWithToken';
import { useCart } from 'hook/CartProvider';
import { useAuthContext } from 'hook/AuthProvider';

// interface CartItem {
//     product: Product;
//     selectedOption?: Option | null;
//     quantity: number;
//     box_cnt: number;
// }


export const Detail: React.FC = () => {
    const { cartItems, setCartItems } = useCart();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const product = useLocation().state.product;

    const [isSticky, setIsSticky] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [optionPrice, setOptionPrice] = useState<number>(0);
    const [box_cnt, setBoxCnt] = useState<number>(1);

    const [totalPrice, setTotalPrice] = useState<number>((product.regularPrice - product.salePrice) * quantity + (product.shippingCost * box_cnt));

    // 옵션 받아오기
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${product.productId}/options`);
                setOptions(response.data);
                setSelectedOption(response.data[0]);
                setQuantity(1);
                setTotalPrice((product.regularPrice - product.salePrice) * 1 + (product.shippingCost * 1));
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, [product.productId]);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const sticky = scrollTop > 100; // 100px 이상 스크롤되었을 때 sticky 상태로 변경
        setIsSticky(sticky);
    };

    // 컴포넌트가 마운트되었을 때 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트되기 전에 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // 빈 배열로 의존성 배열을 설정하여 컴포넌트가 마운트될 때만 이벤트 리스너가 추가되도록 함


    const handleQuantityChange = (value: number) => {
        const newQuantity = quantity + value;
        let q: number = 1;
        let box_cnt = 1;
        if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
            q = newQuantity;
        } else if (newQuantity < 1) {
            q = 1; // 최소 수량은 1로 유지
        } else {
            q = product.stockQuantity; // 재고 수량으로 수량 조정
        }
        setQuantity(q);
        box_cnt = (Math.ceil(q / product.maxQuantityPerDelivery));
        setBoxCnt(box_cnt)
        setTotalPrice((product.regularPrice - product.salePrice + optionPrice) * q + (product.shippingCost * box_cnt))
    };


    const handleQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;
        let q: number = 1;
        let box_cnt = 1;
        if (value === "" || value === "0") {
            q = 1; // 빈 문자열 또는 0 입력 시 최소 수량 1로 설정

        } else {
            const newValue = parseInt(value);
            if (!isNaN(newValue) && newValue >= 1 && newValue <= product.stockQuantity) {
                q = newValue;
            } else if (newValue > product.stockQuantity) {
                q = product.stockQuantity; // 재고 수량으로 수량 조정
            }
        }
        setQuantity(q);
        box_cnt = (Math.ceil(q / product.maxQuantityPerDelivery));
        setBoxCnt(box_cnt)
        setTotalPrice((product.regularPrice - product.salePrice + optionPrice) * q + (product.shippingCost * box_cnt))
    };

    const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionId = Number(event.target.value);
        const selectedOption = options.find(option => option.optionId === selectedOptionId);

        // 옵션 선택에 따른 추가 금액을 총 금액에 반영
        if (selectedOption) {
            setOptionPrice(selectedOption.addPrice);
            setTotalPrice((product.regularPrice - product.salePrice + selectedOption.addPrice) * quantity + (product.shippingCost * box_cnt));
            setSelectedOption(selectedOption);
        } else {
            setSelectedOption(null);
        }
    };

    function showList(quantity: number, maxQuantityPerDelivery: number) {
        let arr = [];
        const n = quantity / maxQuantityPerDelivery;
        let count = 0;

        for (let i = 0; i < n; i++) {
            arr.push(
                <div className="border-b-2 border-gray-200 px-4 py-1 grid grid-cols-3 place-items-center">
                    <div>
                        <div>{product.name}</div>
                        <div className='text-sm text-gray-400'>- {selectedOption?.name}({selectedOption?.addPrice.toLocaleString()})  배송 비({product.shippingCost.toLocaleString()}) - </div>
                    </div>
                    <div className="">{count = Math.min(maxQuantityPerDelivery, quantity - (i * maxQuantityPerDelivery))}개</div>
                    <div className="">{((product.regularPrice - product.salePrice + optionPrice) * count + product.shippingCost).toLocaleString()} 원</div>
                </div>
            )
        }
        return (arr);
    }


    const handleAddToCart = async () => {
        try {
            const cartInputItem = {
                productId: product.productId,
                optionId: selectedOption?.optionId,
                quantity: quantity,
                boxCnt: box_cnt
            };

            const url = '/cart/cartSave';
            const post = 'POST';
            const data = cartInputItem;

            const response = await sendRequestWithToken(url, post, data, setIsLoggedIn);
            console.log(response);
            alert('장바구니에 상품이 추가되었습니다.');

            const updatedCartItems = cartItems.map(cart => {
                if (cart.id === response.cartId) {
                    // 이미 해당 ID를 가진 카트 아이템이 존재하면 업데이트
                    return {
                        ...cart,
                        id: response.cartId,
                        cartItem: {
                            product: product,
                            selectedOption,
                            quantity: response.quantity,
                            box_cnt: response.boxCnt,
                        },
                        isSelected: true
                    };
                }
                return cart;
            });

            const isNewItem = updatedCartItems.every(cart => cart.id !== response.cartId);

            if (isNewItem) {
                // 새로운 아이템일 경우 목록에 추가
                const newCart: Cart = {
                    id: response.cartId,
                    cartItem: {
                        product: product,
                        selectedOption,
                        quantity,
                        box_cnt,
                    },
                    isSelected: true
                };
                setCartItems([...updatedCartItems, newCart]);
            } else {
                // 기존 아이템을 업데이트한 경우 업데이트된 목록으로 설정
                setCartItems(updatedCartItems);
            }


        } catch (error) {
            console.log('errr')

            const existingCartCookie = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')!) : [];;

            // 장바구니에 추가하려는 상품과 옵션에 대한 정보
            const newItem: CartItem = {
                product: product,
                selectedOption: selectedOption,
                quantity: quantity,
                box_cnt: box_cnt,
            };

            let updatedCartItems: CartItem[] = [];

            // 기존에 선택된 상품이 있는지 확인
            const existingItemIndex = existingCartCookie.findIndex((item: CartItem) => {
                return item.product.productId === product.productId && item.selectedOption?.optionId === selectedOption?.optionId;
            });

            // 기존에 선택된 상품이 있을 경우, 쿠키에서 해당 아이템을 찾아 업데이트합니다.
            if (existingItemIndex !== -1) {
                // 기존에 선택된 상품이 있을 경우, 수량을 합산하여 업데이트
                const existingItem = existingCartCookie[existingItemIndex];
                const updatedQuantity = existingItem.quantity + quantity;
                const updatedBoxCnt = Math.ceil(updatedQuantity / existingItem.product.maxQuantityPerDelivery);

                // 기존 아이템을 업데이트합니다.
                existingCartCookie[existingItemIndex] = {
                    ...existingItem,
                    quantity: updatedQuantity,
                    box_cnt: updatedBoxCnt
                };

                // 업데이트된 아이템 목록을 새로운 카트 아이템 목록으로 설정합니다.
                updatedCartItems = existingCartCookie;
            } else {
                // 기존에 선택된 상품이 없을 경우, 새로운 상품으로 추가합니다.
                updatedCartItems = [...existingCartCookie, newItem];
            }
            // 쿠키에 업데이트된 장바구니 정보 저장
            Cookies.set('cartItems', JSON.stringify(updatedCartItems), { expires: 2 });

            const newCartItems = updatedCartItems.map((item, index) => ({
                id: index,
                cartItem: item,
                isSelected: true,
            }));
            setCartItems(newCartItems);

            alert('장바구니에 상품이 추가되었습니다.');

        }
    };

    return (
        <div className="bg-white text-gray-700">

            <main className="container mx-auto my-8 p-4">
                <div className="flex flex-wrap md:flex-nowrap items-stretch">
                    <div className="w-full md:w-1/2 p-4">
                        <img src={`../upload/${product.imageUrl}`} alt={product.imageUrl} className="w-full h-96 object-cover m-auto rounded shadow-lg " />
                    </div>
                    <div className="w-full md:w-1/2 border-t-2 border-b-2 border-blue-700">
                        <h1 className="text-2xl text-blue-700 font-bold p-3">{product.name}</h1>
                        <h1 className="text-xl text-gray-500 font-bold border-b-2 border-gray-200 p-2">{product.description}</h1>

                        <div className="text-start border-b-2 border-gray-200 px-4 py-1">
                            <div className="grid grid-cols-5">
                                <div className="font-bold">판매가</div>
                                <div className="col-span-4 text-xl">{(product.regularPrice - product.salePrice).toLocaleString()}원</div>
                            </div>
                        </div>
                        <div className="grid grid-rows-3 text-start border-b-2 border-gray-200 px-4 py-1">
                            <div className="grid grid-cols-5">
                                <div className="font-bold">원산지</div>
                                <div className="col-span-4">완도군</div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="font-bold">배송</div>
                                <div className="col-span-4">택배</div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="font-bold">배송 비</div>
                                <div className="col-span-4">{product.shippingCost.toLocaleString()}원</div>
                            </div>

                        </div>
                        <div className="border-b-2 border-gray-200 px-4 py-2">
                            <label htmlFor="option-select" className="mb-2"><strong className="text-blue-700">[필수]</strong> 옵션 선택 </label>
                            <select id="option-select" className="w-full border-2 border-blue-700 rounded p-2 focus:ring-1 focus:ring-blue-700" onChange={handleOptionSelect}>
                                {options.map((option: Option) => (
                                    <option key={option.optionId} value={option.optionId}>
                                        <div> {option.name}</div>
                                        <div> +{(option.addPrice).toLocaleString()}원</div>
                                    </option>
                                ))}
                            </select>
                        </div>

                        <>
                            {showList(quantity, product.maxQuantityPerDelivery)}
                        </>

                        <div className="flex justify-center space-x-2 py-4">
                            <button className="bg-blue-700 text-sm text-white px-4 py-2 rounded" onClick={() => handleQuantityChange(-1)}>-</button>
                            <input
                                type="text"
                                value={quantity.toLocaleString()}
                                onChange={handleQuantityInputChange}
                                className="w-16 text-center text-sm border border-gray-300 rounded"
                            />
                            <button className="bg-blue-700 text-sm text-white px-4 py-2 rounded" onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        <div className="flex justify-between  border-2 border-blue-700 rounded">
                            <div className="text-2xl p-4 font-bold text-white bg-blue-700">최종 금액</div>
                            <div className='text-2xl p-4 font-bold text-blue-700 text-end'>{totalPrice.toLocaleString()} 원</div>
                        </div>
                        <div className="flex justify-center space-x-2 py-4">
                            <button className="bg-blue-700 text-white px-4 py-2 rounded">구매하기</button>
                            <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={handleAddToCart}>장바구니 담기</button>

                        </div>

                    </div>
                </div>

                <div className="my-8 w-full ">
                    <h2 className="text-2xl font-bold my-4">오늘의 <strong className='text-blue-700'>추천</strong> 상품 !</h2>
                    <div className="flex overflow-x-auto gap-4">
                        <div className=''>
                            <div className="w-48 ">
                                <img src="../upload/1.jpg" alt="오징어" className="w-full h-48 object-fill rounded shadow-lg" />
                            </div>
                            <div className="text-center">오징어 1KG</div>
                            <div className="text-center">40,000 원</div>
                        </div>
                    </div>
                </div>

                <div className={"my-8 w-full"}>
                    <DetailTabComp />
                </div>
            </main>


        </div>
    );
}
