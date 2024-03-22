import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../enum/rol.enum";
import { request } from "http";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    // console.log(context.getHandler().arguments);

    // Si no contiene el decorador de rol
    if (!roles) {
      return true;
    }
    console.log(roles);
    // Comprobar si hay un rol, para que no de error y se pare el programa
    const request = context.switchToHttp().getRequest();
    const userRoles = request.headers?.role.split(',')
    return this.validateRoles(roles, userRoles)

  }
  validateRoles(roles: string[], userRoles: string[]) {
    // Devuelve true si hay algun usuario con el rol indicado en el decorador
    return roles.some(role => userRoles.includes(role))
  }
}