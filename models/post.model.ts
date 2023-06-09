import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PostDocument = Post & Document
@Schema({timestamps:true})
export class Post{
    @Prop()
    userId: string

    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    image: string

}

export const PostSchema = SchemaFactory.createForClass(Post)