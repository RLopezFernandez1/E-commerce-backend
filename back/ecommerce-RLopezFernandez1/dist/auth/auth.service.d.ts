import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    signUp(user: Partial<Users>): Promise<{
        id: string;
        name: string;
        email: string;
        age: number;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }>;
    signing(email: string, password: string): Promise<{
        token: string;
        message: string;
    }>;
}
