import { Repository } from "typeorm";
import { Users } from "src/entities/users.entity";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    getUsers(page: number, limit: number): Promise<{
        id: string;
        name: string;
        email: string;
        age: number;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }[]>;
    getUserById(id: string): Promise<Partial<Users>>;
    updateUser(id: string, user: Partial<Users>): Promise<Partial<Users>>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
