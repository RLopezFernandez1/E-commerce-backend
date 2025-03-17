import { Users } from './users.entity';
import { OrderDetails } from './orderdetails.entity';
export declare class Orders {
    id: string;
    date: Date;
    orderDetail: OrderDetails;
    user: Users;
}
