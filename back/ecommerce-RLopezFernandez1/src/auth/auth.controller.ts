import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/users/users.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("Auth")
@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post("signup")
    signUp(@Body() user: CreateUserDto){
        const {confirmPassword, ...newUser} = user;
        return this.authService.signUp(newUser);
    }

    @Post("signin")
    signing(@Body() credentials: LoginUserDto){
        const {email, password} = credentials;
        return this.authService.signing(email, password);
    }

}