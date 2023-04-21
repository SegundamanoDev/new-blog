import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { PostService } from "./post.service";
import { PostDocument } from "src/models/post.model";
import { PostDto } from "src/dto/post.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/guards/decorator/role.decorator";
import { Role } from "src/enum/roles.enum";
import { RightUser } from "src/auth/guards/user.guard";

@Controller('post')
export class PostController{
    constructor(private readonly postservice: PostService){}


    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    async create(@Body() create: PostDto):Promise<PostDocument>{
        return this.postservice.createpost(create)
    }

    @Get('posts')
    async getAll():Promise<PostDocument[]>{
        return this.postservice.findall()
    }

    @Get(':id')
    async getbyid(@Param('id') id: string):Promise<PostDocument>{
        return this.postservice.findone(id)
    }

    @UseGuards(JwtGuard ,RightUser)
    @Delete(':id/delete')
    async delete(@Param('id') id: string):Promise<any>{
        return this.postservice.delete(id)
    }

    @UseGuards(JwtGuard, RightUser)
    @Put(':id/update')
    async update(@Param('id') id: string ,@Body() create: PostDto):Promise<PostDocument>{
        return this.postservice.update(id, create)
    }

    @UseGuards(JwtGuard)
    @Put('mypost')
    async profile(@Request() req:any):Promise<any>{
        return this.postservice.userpost(req.user.id)
    }
}