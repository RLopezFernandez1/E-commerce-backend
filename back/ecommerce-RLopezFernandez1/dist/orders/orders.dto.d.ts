import { Products } from "src/entities/products.entity";
export declare class CreateOrderDto {
    userId: string;
    products: Partial<Products>[];
}
