import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Required roles:', requiredRoles); // Verifica los roles requeridos

    const request = context.switchToHttp().getRequest();

    const user = request.user
    console.log('User roles:', user.roles); // Verifica los roles asignados al usuario

    const valid = requiredRoles.some((role) => user.roles.includes(role));

    if(!valid){
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return valid;
  }
}
