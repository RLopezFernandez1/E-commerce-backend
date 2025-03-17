export declare class CreateUserDto {
    name: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
    address: string;
    phone: number;
    country?: string;
    city?: string;
    isAdmin?: boolean;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
