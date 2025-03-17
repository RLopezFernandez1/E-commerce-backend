type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
    country?: string;
    city?: string;
};
export declare class UsersRepository {
    private users;
    getUsers(page: number, limit: number): Promise<User[]>;
    getUserById(id: string): Promise<{
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string;
        city?: string;
    }>;
    createUser(user: any): Promise<any>;
    updateUser(id: string, user: any): Promise<any>;
    deleteUser(id: string): Promise<User>;
}
export {};
