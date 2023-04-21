import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";

@Controller('auth')
export class AuthController{
    constructor(private authservice: AuthService){}

    @UseGuards(LocalGuard)
    @Post('signin')
    async login(@Request() req:any){
        return this.authservice.token(req.user)
    }
}