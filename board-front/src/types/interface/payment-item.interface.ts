import { Product } from "types";

export default interface PaymentItem {
    paymentDate: string;
    paymentNumber: string;
    paymentStatus: string;
    deliveryStatus: string;
    quantity: number;
    paymentList: Product;
}