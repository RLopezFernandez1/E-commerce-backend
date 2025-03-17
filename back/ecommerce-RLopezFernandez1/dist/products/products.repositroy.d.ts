export declare class ProductsRepository {
    private products;
    getProducts(page: number, limit: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        image: string;
    }[]>;
    getProductById(id: string): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        image: string;
    }>;
    createProduct(product: any): Promise<any>;
    updateProduct(id: string, product: any): Promise<any>;
    deleteProduct(id: string): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        image: string;
    }>;
}
