import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "src/models/post.model";


@Module({
    imports:[MongooseModule.forFeature([{name: 'Post', schema: PostSchema}])],

    controllers:[],
    providers:[],
    exports:[]
})

export class PostModule{}