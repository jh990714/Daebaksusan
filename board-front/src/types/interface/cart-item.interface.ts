import { ProductList } from "types";

export default interface CartItem {
    product: ProductList;
    isSelected: boolean; // 체크박스 선택 상태
    quantity: number;
    
}