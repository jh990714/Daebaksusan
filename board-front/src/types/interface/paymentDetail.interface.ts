import { CartItem } from "types";

export default interface PaymentDetail {
    orderNumber: string,
    orderItems: CartItem[]
}