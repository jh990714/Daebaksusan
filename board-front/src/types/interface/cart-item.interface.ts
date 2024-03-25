import { CartItem } from "types";

export default interface Cart {
    id: number,
    cartItem: CartItem,
    isSelected: boolean; // 체크박스 선택 상태
}

