import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostDto } from "src/dto/post.dto";
import { PostDocument } from "src/models/post.model";

@Injectable()
export class PostService{
    constructor(@InjectModel('Post') private readonly postmodel: Model<PostDocument>) {}

    async createpost(create: PostDto):Promise<PostDocument>{
        const newPost = await this.postmodel.create(create)
        return newPost.save()
    }

    async findall():Promise<PostDocument[]>{
        return this.postmodel.find().exec()
    }

    async findone(id: string):Promise<PostDocument | any>{
        const post = await this.postmodel.findById(id).exec()
        if(!post) {
            return new NotFoundException()
        }
        return post;
    }

    async delete(id: string):Promise<any>{
        const post = await this.postmodel.findByIdAndDelete(id)
        if(!post) {
            return new NotFoundException()
        }
        if(post) {
            return 'post has been deleted'
        }
    }

    async update(id: string, create: PostDto):Promise<any>{
        const post = await this.postmodel.findByIdAndUpdate(id, {...create}, {new:true})
        if(!post) {
            return new NotFoundException()
        }
       return post
    }

    async userpost(id: any):Promise<any>{
        const post = await this.postmodel.find({userId:id})
        if(!post) {
            return 'you can only get your post'
        }
        return post
    }
}