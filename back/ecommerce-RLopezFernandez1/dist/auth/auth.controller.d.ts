import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/users/users.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(user: CreateUserDto): Promise<{
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
    signing(credentials: LoginUserDto): Promise<{
        token: string;
        message: string;
    }>;
}
