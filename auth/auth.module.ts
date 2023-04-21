import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SecretKeys } from "src/constants/keys.constant";
import { UserModule } from "src/routes/userroutes/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { LocalGuard } from "./guards/local.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtGuard } from "./guards/jwt.guard";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";



@Module({
    imports:[UserModule, PassportModule, JwtModule.register({
        secret: SecretKeys.jwtSecret,
        signOptions:{expiresIn: SecretKeys.jwtExpiresIn}
    })],

    controllers:[AuthController],
    providers:[AuthService, LocalStrategy, LocalGuard, JwtStrategy, JwtGuard],
    exports:[]
})

export class AuthModule{}