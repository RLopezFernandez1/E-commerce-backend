import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    getUserById(id: string): Promise<Partial<import("../entities/users.entity").Users>>;
    updateUser(id: string, user: CreateUserDto): Promise<Partial<import("../entities/users.entity").Users>>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
