"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
let ProductsRepository = class ProductsRepository {
    constructor() {
        this.products = [
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
        ];
    }
    async getProducts(page, limit) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const products = this.products.slice(start, end);
        return products;
    }
    async getProductById(id) {
        return this.products.find(product => product.id === +id);
    }
    async createProduct(product) {
        const id = this.products.length + 1;
        product.id = id;
        this.products.push(product);
        return product;
    }
    async updateProduct(id, product) {
        const oldProduct = this.products.find((product) => product.id === +id);
        if (!oldProduct) {
            return null;
        }
        const updatedProduct = { ...oldProduct, ...product };
        const index = this.products.findIndex((product) => product.id === +id);
        this.products[index] = updatedProduct;
        return updatedProduct;
    }
    async deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === +id);
        const product = this.products[index];
        if (index === -1) {
            return null;
        }
        this.products.splice(index, 1);
        return product;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)()
], ProductsRepository);
//# sourceMappingURL=products.repositroy.js.map