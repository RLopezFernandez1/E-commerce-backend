import { ProductsService } from "./products.service";
import { Products } from "src/entities/products.entity";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: number, limit: number): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<Products>;
    createProduct(product: Partial<Products>): Promise<Products>;
    updateProduct(id: string, product: Partial<Products>): Promise<Products>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
