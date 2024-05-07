import Product from "./product-item.interface";

export default interface VideoItem {
    videoId: number;
    videoUrl: string;
    products: Product[]
}