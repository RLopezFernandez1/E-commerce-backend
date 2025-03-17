"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(page, limit) {
        const users = await this.usersRepository.find();
        const start = (+page - 1) * +limit;
        const end = start + +limit;
        const usersWithoutPasswords = users.map(({ password, isAdmin, ...userWithoutPassword }) => userWithoutPassword);
        return usersWithoutPasswords.slice(start, end);
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
                orders: true,
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`User whit id ${id} not found`);
        }
        const { password, isAdmin, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async updateUser(id, user) {
        const existingUser = await this.usersRepository.findOneBy({ id });
        if (!existingUser) {
            throw new common_1.NotFoundException(`User whith id ${id} not found`);
        }
        if (user.password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
        const updatedUser = this.usersRepository.merge(existingUser, user);
        const savedUser = await this.usersRepository.save(updatedUser);
        const { password, isAdmin, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async deleteUser(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.usersRepository.delete(id);
        return { message: `Product with id ${id} has been successfully deleted` };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map