import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/enum/roles.enum";

export type UserDocument = User & Document
@Schema({timestamps:true})
export class User{
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User)