import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { UserService } from "src/routes/userroutes/user.service";

@Injectable()
export class RightUser implements CanActivate{
    constructor(private userservice: UserService){}

   async canActivate(context: ExecutionContext):Promise<boolean>{
    const req = context.switchToHttp().getRequest()
    if(req) {
        const {id} = req.param
        const user = await this.userservice.findOne(id)
        if(req.user.id === user.id){
            return true
        }
        return false
    }
   }
}
