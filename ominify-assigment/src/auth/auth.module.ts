import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,LocalStrategy,UserService]
})
export class AuthModule {}
