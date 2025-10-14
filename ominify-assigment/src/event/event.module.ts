import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.startegy';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[JwtModule],
  controllers: [EventController],
  providers: [EventService,PrismaService,JwtStrategy,UserService]
})
export class EventModule {}
