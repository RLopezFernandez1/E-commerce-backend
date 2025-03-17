"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../entities/products.entity");
const data = require("../data.json");
const categories_entity_1 = require("../entities/categories.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async getProducts(page, limit) {
        const products = await this.productsRepository.find();
        const start = (+page - 1) * +limit;
        const end = start + +limit;
        return products.slice(start, end);
    }
    async addProducts() {
        const categories = await this.categoriesRepository.find();
        if (categories.length < 1) {
            throw new common_1.NotFoundException('Categories not found');
        }
        data.map(async (element) => {
            const category = categories.find((category) => category.name === element.category);
            const product = new products_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
                .values(product)
                .orIgnore(`("name") DO NOTHING`)
                .execute();
        });
        return 'Products added';
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product whith id ${id} not found`);
        }
        return product;
    }
    async createProduct(product) {
        const existingProduct = await this.productsRepository.findOne({
            where: { name: product.name },
        });
        if (existingProduct) {
            throw new common_1.BadRequestException(`Product ${product.name} already exists`);
        }
        const newProduct = this.productsRepository.create(product);
        return await this.productsRepository.save(newProduct);
    }
    async updateProduct(id, product) {
        const oldProduct = await this.productsRepository.findOne({ where: { id } });
        if (!oldProduct) {
            throw new common_1.NotFoundException(`Product id ${id} not found`);
        }
        const updatedProduct = { ...oldProduct, ...product };
        return await this.productsRepository.save(updatedProduct);
    }
    async deleteProduct(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product id ${id} not found`);
        }
        await this.productsRepository.delete(product);
        return { message: `Product with id ${id} has been successfully deleted` };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map