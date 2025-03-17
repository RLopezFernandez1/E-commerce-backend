import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateUserDto } from "./users.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query("page") page: number, @Query("limit") limit: number){

        if(page && limit){
            return this.usersService.getUsers(page, limit);
        }
        return this.usersService.getUsers(1, 5);
    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    getUserById(@Param("id", ParseUUIDPipe) id: string){
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put(":id")
    @UseGuards(AuthGuard)
    updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user: CreateUserDto){
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteUser(@Param("id", ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id);
    }
}