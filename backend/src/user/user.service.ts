import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express';

@Injectable()
export class UserService {


    constructor(private prisma: PrismaService,private config: ConfigService){}


}
