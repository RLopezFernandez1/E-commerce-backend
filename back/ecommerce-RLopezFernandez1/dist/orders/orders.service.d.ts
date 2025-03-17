import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly orderDetailsRepository;
    private readonly usersRepository;
    private readonly productsRepository;
    constructor(ordersRepository: Repository<Orders>, orderDetailsRepository: Repository<OrderDetails>, usersRepository: Repository<Users>, productsRepository: Repository<Products>);
    getOrder(id: string): Promise<Orders>;
    addOrder(userId: string, products: Partial<Products>[]): Promise<Orders>;
}
