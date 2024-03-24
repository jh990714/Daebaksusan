import { SubCategory } from "types";

export default interface Category {
    id: number;
    name: string;
    subcategories: SubCategory[];
}