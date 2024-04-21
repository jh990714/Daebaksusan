import { Coupon } from "types";

export default interface Member {
    memberId: number,
    id: String,
    password: String,
    name: String,
    phone: String,
    email: String,
    postalCode: String,
    address: String,
    detailAddress: String,
    type: String,
    role: String,
    coupons: Coupon[],
    points: number,
};