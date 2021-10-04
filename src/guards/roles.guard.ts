import { Reflector } from "@nestjs/core";
import {Injectable, ExecutionContext, CanActivate} from '@nestjs/common';
import { Role } from "src/entity/user.entity";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!requireRoles) return true; 

        const { user } = context.switchToHttp().getRequest();

        return requireRoles.some(role => user.role === role);
    }
}