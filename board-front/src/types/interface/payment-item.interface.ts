import CartItem from "./cart.interface";

export default interface PaymentItem extends CartItem {
    isReview: boolean
}