import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignupDto {

    @ApiProperty({
        description:"User email",
    })
    @IsEmail()
    email: string;

         @ApiProperty({
        description:"User given name",
    })
    @IsNotEmpty()
    firstName: string;
    
             @ApiProperty({
        description:"User family name",
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description:"Password"
    })
    @IsStrongPassword()
    password: string;

}

export class LoginDto{

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    password: string;

}