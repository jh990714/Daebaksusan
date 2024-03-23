// export default interface ProductList {
//     productId: number;
//     productName: string;
//     productPrice: number
//     productDiscount: number;
//     productImgPath: string
// }

export default interface Product {
    productId: number;
    category: string;
    name: string;
    imageUrl: string;
    stockQuantity: number;
    regularPrice: number;
    salePrice: number;
    shippingCost: number;
    description: string;
    arrivalDate: Date;
    recommended: boolean;
}
