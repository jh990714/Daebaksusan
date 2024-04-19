import {PaymentItem } from "types";


export default interface PaymentDetail {
    orderNumber: string,
    orderItems: PaymentItem[],
    cancel: boolean
}