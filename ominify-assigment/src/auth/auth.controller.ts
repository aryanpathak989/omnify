import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'generated/prisma';
import { CurrentUser } from './decorator';
import { LocalAuth } from './guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignupDto } from './dto';
import { use } from 'passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuth)
    @Post("/login")
    async verifyLogin(@CurrentUser() user: User, @Res({passthrough:true}) res: Response) {
        await this.authService.loginWithEmailAndPassword(user,res)
    }

    @Post("/signup")
    async signupUser(@Body() user: SignupDto){
        return await this.authService.signupUser(user)
    }

}
