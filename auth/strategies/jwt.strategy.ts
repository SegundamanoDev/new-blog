import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SecretKeys } from "src/constants/keys.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: SecretKeys.jwtSecret
    })}

    async validate(payload:any){
        return{...payload}
    }
}