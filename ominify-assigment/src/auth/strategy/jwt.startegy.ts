import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){

    constructor(config: ConfigService, private userService: UserService){

        const JWT_SECRET = config.get<string>("ACCESS_SECRET")
        if(!JWT_SECRET) throw new Error("ACCESS_SECRET not found")

        super({
        jwtFromRequest: ExtractJwt.fromExtractors([

            (request: Request) => {
                const token = request.cookies?.access_token;
                return token;
            }
        ]),
        secretOrKey: JWT_SECRET
        });

    }

    async validate(payload:{sub:string}) {
        if(!payload.sub) throw new ForbiddenException()
        return  await this.userService.getUserByPKId(payload.sub)
    }

}