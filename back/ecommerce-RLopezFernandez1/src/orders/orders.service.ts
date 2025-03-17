import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    ){}

    async getOrder(id: string): Promise<Orders> {
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: {
                orderDetail:{
                    products: true,
                }
            }
        })

        if(!order){
            throw new NotFoundException(`Order with id ${id} not found`);
        }

        return order;

    }

    async addOrder(userId: string, products: Partial<Products>[]): Promise<Orders> {
        let totalPrice = 0;
        const user = await this.usersRepository.findOneBy({ id: userId });

        if(!user){
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray: Products [] = await Promise.all(products.map(async (product) => {
            const existingProduct = await this.productsRepository.findOneBy({
                id: product.id,
                
            })

            if (!existingProduct){
                throw new NotFoundException(`Product with id ${product.id} not found`);
                
            }

            if (existingProduct.stock < 1){
                throw new ForbiddenException(`Product with id ${product.id} out of stock`);
            }

            totalPrice += Number(existingProduct.price);

            await this.productsRepository.update(
                {id: product.id},
                {stock: existingProduct.stock - 1},
            )
            
            return existingProduct
        })
        )
        const orderDetail = new OrderDetails();

        orderDetail.price = Number(totalPrice.toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.orderDetailsRepository.save(orderDetail);

        return await this.ordersRepository.findOne({
            where: {id: newOrder.id},
            relations: {
                orderDetail: true,
            },
        })
    }
}
