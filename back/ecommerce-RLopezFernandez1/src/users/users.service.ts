import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/entities/users.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

    async getUsers(page: number, limit: number){
        const users = await this.usersRepository.find();
        const start = (+page - 1) * +limit;
        const end = start + +limit;

        const usersWithoutPasswords = users.map(({ password, isAdmin, ...userWithoutPassword }) => userWithoutPassword);
        return usersWithoutPasswords.slice(start, end);
    }

    async getUserById(id: string): Promise<Partial<Users>> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
                orders: true,
            }
        });
        if (!user) {
            throw new NotFoundException(`User whit id ${id} not found`);
        }
        const {password, isAdmin, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }
    
    
    async updateUser(id: string, user: Partial<Users>): Promise<Partial<Users>> {
        const existingUser = await this.usersRepository.findOneBy({ id });
        if(!existingUser){
            throw new NotFoundException(`User whith id ${id} not found`);
        }
        if (user.password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }

        const updatedUser = this.usersRepository.merge(existingUser, user)

        const savedUser = await this.usersRepository.save(updatedUser);

        const { password, isAdmin, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;

    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        await this.usersRepository.delete(id);
        // const { password, isAdmin, ...userWithoutPassword } = user;
        return { message: `Product with id ${id} has been successfully deleted` }; 
    }
}