import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private prisma: PrismaService,private userService: UserService) {

        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string) {
        if(!email || !password){
            throw new ForbiddenException()
        }
        return this.userService.verifyUserByEmailAndPassword(email,password)
    }



}