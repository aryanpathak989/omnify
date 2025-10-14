import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import {Response } from 'express';
import { User } from 'generated/prisma';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {


    constructor(private prisma: PrismaService,private config:ConfigService){}


    async signupUser( user: SignupDto){

        try{
            const hash = await bcrypt.hash(user.password,10)

            const userDetails = await this.prisma.user.create({
                data:{
                    email:user.email,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    password:hash
                }
            })
            console.log(user)
            return {message:"User created succesfully"}
        }
        catch(err){

        }
    }

    async loginWithEmailAndPassword (user: User,res: Response){

    const payload = {
        sub:user.id
    }

    const accessTokenExpiry = this.config.getOrThrow("ACCESS_TOKEN_EXPIARY")
    const refreshTokenExpiry = this.config.getOrThrow("REFRESH_TOKEN_EXPIARY")
    const accessTokenSecret = this.config.getOrThrow("ACCESS_SECRET")
    const refreshTokenSecret = this.config.getOrThrow("REFRESH_SCERET")

    const access_token = jwt.sign(payload,accessTokenSecret,{
        expiresIn:accessTokenExpiry
    })

    const refresh_token = jwt.sign(payload,refreshTokenSecret,{
        expiresIn:refreshTokenExpiry
    })

    const hashRefreshToken = await bcrypt.hash(refresh_token,10)

    await this.prisma.user.update({
        where:{
            email:user.email
        },
        data:{
            refresh_token: hashRefreshToken
        }
    })

    res.cookie('access_token',access_token,{
        httpOnly: true,
        secure: false
    })

    res.cookie('refresh_token',refresh_token,{
        httpOnly:true,
        secure:false
    })


    const {password,refresh_token:refresh,...existingUser} = user

    return res.json(existingUser)

    }
}
