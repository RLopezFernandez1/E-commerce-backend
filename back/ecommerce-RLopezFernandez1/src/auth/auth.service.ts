import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService){}


    
    async signUp(user: Partial<Users>){

        const userExists = await this.usersRepository.findOneBy({email: user.email});
        if(userExists){
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = {...user, password: hashedPassword};

        const savedUser = await this.usersRepository.save(newUser);

        const {password, isAdmin, ...userWithoutPassword} = savedUser;
        return userWithoutPassword;
    }

    async signing(email: string, password: string){

        const user = await this.usersRepository.findOneBy({email: email}); //el primer email es el nombre de la columna en la base de datos y el segundo es el valor que se le pasa

        

        if(!user){
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            throw new BadRequestException('Invalid credentials');
        }
        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }
        console.log('Generated token payload:', payload);

        const token = this.jwtService.sign(payload)

        return {
            token,
            message: 'User logged in'
        }
        
    }
}
