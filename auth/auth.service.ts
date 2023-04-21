import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/routes/userroutes/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService{
    constructor(private readonly userservice: UserService, private jwtService: JwtService){}

    async signin(email: string, password: string):Promise<any>{
        const user = await this.userservice.findByEmail(email)
        const correctPassword = await bcrypt.compare(password, user.password)
        if(!user) {
            return new NotFoundException()
        }
        if(user && correctPassword) {
            return user
        }
    }

    async token(user:any):Promise<any>{
        const payload = {id:user.id, email: user.email}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}