import { Product } from "types";
import Option from "./option-item.interface";

export default interface CartItem {
    product: Product,
    selectedOption?: Option | null;
    quantity: number,
    box_cnt: number,
};