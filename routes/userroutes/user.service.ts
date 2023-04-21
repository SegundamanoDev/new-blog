import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "src/dto/user.dto";
import { UserDocument } from "src/models/user.model";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    async create(create: UserDto):Promise< UserDocument | any >{
        const {email, name, password, roles} = create

        const hash = await bcrypt.hash(password, 12)
        const existUser = await this.findByEmail(email)
        if(existUser) {
            return 'email already exist'
        }
        const newUser = await this.userModel.create({email, name, roles, password:hash})
        return newUser.save()
    }

    async findAll():Promise<UserDocument[]>{
        return this.userModel.find().exec()
    }

    async findOne(id: string):Promise<UserDocument>{
        const user = await this.userModel.findById(id).exec()
        if(!user) {
            throw new NotFoundException()
        }
        return user;
    }

    async findByEmail(email: string):Promise<any>{
        const user = await this.userModel.findOne({email})
        if(!user) {
            return new NotFoundException()
        }
        return user
    }

    async delete(id: string):Promise<any>{
        const user = await this.userModel.findByIdAndDelete(id)
        if(!user) {
            throw new NotFoundException()
        }
        return 'user has been deleted'
    }

    async update(id: string, create: UserDto):Promise<UserDocument>{
        const user = await this.userModel.findByIdAndUpdate(id, {create}, {new:true})
        if(!user) {
            throw new NotFoundException()
        }
        return user;
    }

    async userprofile(id: any):Promise<any>{
        const user = await this.userModel.findById(id)
        if(!user) {
            return 'you can only get your profile'
        }
        return user
    }
}