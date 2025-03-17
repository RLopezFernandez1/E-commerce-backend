import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches, IsNumber, Validate, IsEmpty } from "class-validator";
import { MatchPassword } from "src/utils/matchPassword";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description: 'Name of the user', example: 'Rodrigo'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({description: 'Email address of the user', example: 'rodrigo@mail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: "Age of the user", example: 18})
    @IsNotEmpty()
    @IsNumber()
    age: number

    @ApiProperty({description: 'Password of the user', example: 'Password123!'})
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
      message:
        'Password must have at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*), and be between 8 and 15 characters long.',
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @ApiProperty({ description: 'Password confirmation', example: 'Password123!' })
    @IsString()
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @ApiProperty({description: 'Address of the user', example: 'Calle 123'})
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({description: 'Phone number of the user', example: 123456789})
    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @ApiProperty({description: 'Country of the user', example: 'Argentina'})
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country?: string;

    @ApiProperty({description: 'City of the user', example: 'Córdoba'})
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city?: string;

    @ApiProperty({ description: 'Admin role flag (only for internal use)', example: false})
    @IsEmpty()
    isAdmin?: boolean;
}

export class LoginUserDto {
    @ApiProperty({description: 'Email address of the user', example: 'rodrigo@mail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Password of the user', example: 'Password123!'})
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
      message:
        'Password must have at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*), and be between 8 and 15 characters long.',
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;
}