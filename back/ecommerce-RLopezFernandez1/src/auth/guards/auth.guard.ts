import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles.enum';


@Injectable()
export class AuthGuard implements CanActivate {
constructor(private jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    console.log('Received token in AuthGuard:', token);

    if (!token){ 
      throw new UnauthorizedException('You need to be logged in');
    }

    try{
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, {secret});

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      if (user.isAdmin){
        user.roles = [Role.Admin];
      }else{
        user.roles = [Role.User];
      }

      request.user = user;

      return true;

    }catch(error){
      throw new UnauthorizedException('Invalid token');
    }
  }
}
