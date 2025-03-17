import { Products } from './products.entity';
import { Orders } from './orders.entity';
export declare class OrderDetails {
    id: string;
    price: number;
    order: Orders;
    products: Products[];
}
