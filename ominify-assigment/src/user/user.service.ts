import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express';

@Injectable()
export class UserService {


    constructor(private prisma: PrismaService,private config: ConfigService){}

      async getUserByPKId(id: string) {

        const user = await this.prisma.user.findUnique({
        where: {
            id,
        },
        });

        if (!user) {
            throw new ForbiddenException();
        }

    const { password, refresh_token, ...existingUser } = user;

    return existingUser;
  }

    async verifyUserByEmailAndPassword(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password == null) {
      throw new ForbiddenException();
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException();
    }

    return user;
  }


}
