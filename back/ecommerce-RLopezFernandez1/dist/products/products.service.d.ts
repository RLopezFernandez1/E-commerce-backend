import { Repository } from "typeorm";
import { Products } from "src/entities/products.entity";
import { Categories } from "src/entities/categories.entity";
export declare class ProductsService {
    private readonly productsRepository;
    private readonly categoriesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>);
    getProducts(page: number, limit: number): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<Products>;
    createProduct(product: Partial<Products>): Promise<Products>;
    updateProduct(id: string, product: Partial<Products>): Promise<Products>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
