import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports:[MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],

    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})

export class UserModule{}