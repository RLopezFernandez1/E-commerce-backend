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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderdetails_entity_1 = require("../entities/orderdetails.entity");
const orders_entity_1 = require("../entities/orders.entity");
const products_entity_1 = require("../entities/products.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderDetailsRepository, usersRepository, productsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
    }
    async getOrder(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetail: {
                    products: true,
                }
            }
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return order;
    }
    async addOrder(userId, products) {
        let totalPrice = 0;
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const order = new orders_entity_1.Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ordersRepository.save(order);
        const productsArray = await Promise.all(products.map(async (product) => {
            const existingProduct = await this.productsRepository.findOneBy({
                id: product.id,
            });
            if (!existingProduct) {
                throw new common_1.NotFoundException(`Product with id ${product.id} not found`);
            }
            if (existingProduct.stock < 1) {
                throw new common_1.ForbiddenException(`Product with id ${product.id} out of stock`);
            }
            totalPrice += Number(existingProduct.price);
            await this.productsRepository.update({ id: product.id }, { stock: existingProduct.stock - 1 });
            return existingProduct;
        }));
        const orderDetail = new orderdetails_entity_1.OrderDetails();
        orderDetail.price = Number(totalPrice.toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.orderDetailsRepository.save(orderDetail);
        return await this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: {
                orderDetail: true,
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_1.InjectRepository)(orderdetails_entity_1.OrderDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(3, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map