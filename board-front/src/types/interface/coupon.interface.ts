export default interface Coupon {
    couponId: number,
    couponName: string,
    discount: number,
    minimumOrderAmount: number,
    issueDate: Date,
    validUntil: Date
}