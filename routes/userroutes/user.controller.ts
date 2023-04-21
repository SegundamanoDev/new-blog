import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "src/dto/user.dto";
import { UserDocument } from "src/models/user.model";
import { JwtGuard } from "src/auth/guards/jwt.guard";

@Controller('user')
export class UserController{
    constructor(private readonly userservice: UserService){}

    @Post('create')
    async create(@Body() create: UserDto):Promise<UserDocument>{
        return this.userservice.create(create)
    }

    @Get('users')
    async getAll():Promise<UserDocument[]>{
        return this.userservice.findAll()
    }

    @Get(':id')
    async getbyid(@Param('id') id: string):Promise<UserDocument>{
        return this.userservice.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Delete('delete')
    async delete(@Request() req:any):Promise<any>{
        return this.userservice.delete(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Put('update')
    async update(@Request() req:any ,@Body() create: UserDto):Promise<UserDocument>{
        return this.userservice.update(req.user.id, create)
    }

    @UseGuards(JwtGuard)
    @Put('profile')
    async profile(@Request() req:any):Promise<any>{
        return this.userservice.userprofile(req.user.id)
    }
}