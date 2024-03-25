import { ProductList } from "types";
import Option from "./option-item.interface";

export default interface CartItem {
    product: ProductList,
    selectedOption: Option,
    quantity: number,
    box_cnt: number,
};