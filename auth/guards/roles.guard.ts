import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common"
import { Reflector } from "@nestjs/core";
import { SecretKeys } from "src/constants/keys.constant";
import { Role } from "src/enum/roles.enum";
@Injectable()

export class RolesGuard implements CanActivate{

    constructor(private reflector: Reflector){}

   async canActivate(context: ExecutionContext):Promise<boolean>{

    const requiredRole = this.reflector.getAllAndOverride<Role[]>(SecretKeys.roles_key, 
        [context.getHandler(), context.getClass()])
        if(!requiredRole) {
            return true
        }

        const req = context.switchToHttp().getRequest()
        if(req){
            const {user} = req
            return requiredRole.some((roles)=> user.role === roles)
        }
    }
}