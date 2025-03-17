import { Orders } from './orders.entity';
export declare class Users {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    isAdmin: boolean;
    orders: Orders[];
}
