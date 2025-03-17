"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
let UsersRepository = class UsersRepository {
    constructor() {
        this.users = [
            {
                id: 1,
                email: "rodrigo@mail.com",
                name: "Rodrigo",
                password: "123456",
                address: "Calle Falsa 123",
                phone: "123456789",
                country: "Argentina",
                city: "Cordoba",
            },
            {
                id: 2,
                email: "francis@mail.com",
                name: "Francis",
                password: "123456",
                address: "Calle Falsa 123",
                phone: "123456789",
                country: "Argentina",
                city: "Cordoba",
            },
            {
                id: 3,
                email: "jose@mail.com",
                name: "Jose",
                password: "123456",
                address: "Calle Falsa 123",
                phone: "123456789",
                country: "Argentina",
                city: "Cordoba",
            },
            {
                id: 4,
                email: "maria@mail.com",
                name: "Maria",
                password: "password1",
                address: "Av. Siempre Viva 742",
                phone: "987654321",
                country: "Argentina",
                city: "Buenos Aires",
            },
            {
                id: 5,
                email: "luis@mail.com",
                name: "Luis",
                password: "securePass123",
                address: "Calle Principal 456",
                phone: "111222333",
                country: "Mexico",
                city: "Monterrey",
            },
            {
                id: 6,
                email: "sofia@mail.com",
                name: "Sofia",
                password: "sofia2023",
                address: "Avenida Libertad 987",
                phone: "444555666",
                country: "Chile",
                city: "Santiago",
            },
            {
                id: 7,
                email: "juan@mail.com",
                name: "Juan",
                password: "juanDoe42",
                address: "Calle Independencia 321",
                phone: "777888999",
                country: "Peru",
                city: "Lima",
            },
            {
                id: 8,
                email: "ana@mail.com",
                name: "Ana",
                password: "anAsecure!",
                address: "Boulevard Central 654",
                phone: "123987654",
                country: "Colombia",
                city: "Bogotá",
            },
            {
                id: 9,
                email: "pablo@mail.com",
                name: "Pablo",
                password: "pabloPass99",
                address: "Plaza Mayor 789",
                phone: "567890123",
                country: "Uruguay",
                city: "Montevideo",
            },
            {
                id: 10,
                email: "carla@mail.com",
                name: "Carla",
                password: "carlaP@ss",
                address: "Camino Real 101",
                phone: "789456123",
                country: "Ecuador",
                city: "Quito",
            }
        ];
    }
    async getUsers(page, limit) {
        const start = (page - 1) * limit;
        const end = start + +limit;
        const users = this.users.slice(start, end);
        return users;
    }
    async getUserById(id) {
        const user = this.users.find((user) => user.id === +id);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async createUser(user) {
        const id = this.users.length + 1;
        user.id = id;
        this.users.push(user);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async updateUser(id, user) {
        const oldUser = this.users.find((user) => user.id === +id);
        if (!oldUser)
            return null;
        const updatedUser = { ...oldUser, ...user };
        const index = this.users.findIndex((user) => user.id === +id);
        this.users[index] = updatedUser;
        return updatedUser;
    }
    async deleteUser(id) {
        const index = this.users.findIndex((user) => user.id === +id);
        const user = this.users[index];
        if (index === -1)
            return null;
        this.users.splice(index, 1);
        return user;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)()
], UsersRepository);
//# sourceMappingURL=users.repository.js.map