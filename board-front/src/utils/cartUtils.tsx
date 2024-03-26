import Cookies from 'js-cookie';
import sendRequestWithToken from 'apis/sendRequestWithToken';
import { Cart, CartItem } from 'types';

export const fetchCartItems = async (setCartItems: React.Dispatch<React.SetStateAction<Cart[]>>) => {
    try {
        const url = '/cart/get';
        const response = await sendRequestWithToken(url, 'GET', null);

        const parsedCartItems: Cart[] = response.map((item: any) => ({
            id: item.cartId,
            cartItem: {
                product: item.product,
                selectedOption: item.option,
                quantity: item.quantity,
                box_cnt: item.boxCnt,
            },
            isSelected: true,
        }));

        setCartItems(parsedCartItems);
    } catch (error) {
        console.log('API 요청 실패:', error);
        const cartCookie = Cookies.get('cartItems');
        if (cartCookie) {
            const parsedCartItems: CartItem[] = JSON.parse(cartCookie);
            const updatedCartItems = parsedCartItems.map((item, index) => ({
                id: index,
                cartItem: item,
                isSelected: true,
            }));
            setCartItems(updatedCartItems);
        }
    }

};


export const fetchCartItemsDelete = async (cartItems: Cart[], setCartItems: React.Dispatch<React.SetStateAction<Cart[]>>) => {
    // 선택되지 않은 아이템만 필터링하여 상태에서 유지
    try {
        const remainingItemsNotSelect = cartItems.filter(item => !item.isSelected);
        const remainingItemstSelect = cartItems.filter(item => item.isSelected);

        const url = '/cart/delete';
        const post = 'POST';
        const data = remainingItemstSelect.map(item => item.id);
        console.log(data)

        const response = await sendRequestWithToken(url, post, data);
        console.log(response);
        setCartItems(remainingItemsNotSelect);
    }
    catch (error) {
        const remainingItemsNotSelect = cartItems.filter(item => !item.isSelected);
        const remainingItemsCookie = remainingItemsNotSelect.map(item => item.cartItem);
        Cookies.set('cartItems', JSON.stringify(remainingItemsCookie));
        setCartItems(remainingItemsNotSelect);
    }

    


};
