import { SetMetadata } from "@nestjs/common";
import { SecretKeys } from "src/constants/keys.constant";
import { Role } from "src/enum/roles.enum";

export const Roles = (...roles: Role[])=>(SetMetadata(SecretKeys.roles_key, roles))