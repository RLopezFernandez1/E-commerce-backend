import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            price: 100,
            stock: true,
            image: 'https://www.google.com'
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            price: 200,
            stock: true,
            image: 'https://www.google.com'
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'Description 3',
            price: 300,
            stock: true,
            image: 'https://www.google.com'
        },
        {
            id: 4,
            name: 'Product 4',
            description: 'High-quality product with unique features.',
            price: 400,
            stock: true,
            image: 'https://example.com/images/product4.jpg'
        },
        {
            id: 5,
            name: 'Product 5',
            description: 'Affordable and reliable product for everyday use.',
            price: 500,
            stock: false,
            image: 'https://example.com/images/product5.jpg'
        },
        {
            id: 6,
            name: 'Product 6',
            description: 'Premium product with advanced technology.',
            price: 600,
            stock: true,
            image: 'https://example.com/images/product6.jpg'
        },
        {
            id: 7,
            name: 'Product 7',
            description: 'Eco-friendly product made with sustainable materials.',
            price: 700,
            stock: true,
            image: 'https://example.com/images/product7.jpg'
        },
        {
            id: 8,
            name: 'Product 8',
            description: 'Compact and lightweight product, ideal for travel.',
            price: 800,
            stock: false,
            image: 'https://example.com/images/product8.jpg'
        },
        {
            id: 9,
            name: 'Product 9',
            description: 'Stylish and modern product for the tech-savvy.',
            price: 900,
            stock: true,
            image: 'https://example.com/images/product9.jpg'
        },
        {
            id: 10,
            name: 'Product 10',
            description: 'Durable product built for long-lasting performance.',
            price: 1000,
            stock: true,
            image: 'https://example.com/images/product10.jpg'
        }
    ]

    async getProducts(page: number, limit: number) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const products = this.products.slice(start, end);
        return products;
    } 

    async getProductById(id: string) {
        return this.products.find(product => product.id === +id);
    }

    async createProduct(product: any) {
        const id = this.products.length + 1;
        product.id = id;
        this.products.push(product);
        return product;
    }

    async updateProduct(id: string, product: any) {

        const oldProduct = this.products.find((product) => product.id === +id);
        if (!oldProduct) {
            return null;
        }
        const updatedProduct = { ...oldProduct, ...product };
        const index = this.products.findIndex((product) => product.id === +id);
        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    async deleteProduct(id: string) {
        const index = this.products.findIndex((product) => product.id === +id);
        const product = this.products[index];
        if (index === -1) {
            return null;
        }
        this.products.splice(index, 1);
        return product;
    }
}