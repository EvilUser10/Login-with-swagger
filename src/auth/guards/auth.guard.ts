import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  // context contiene la información sobre el contexto de ejecución
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // getAllAndOverride: obtiene los metadatos de las fuentes proporcionadas en orden
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      // Contiene la referencia al controlador que está a punto de ser invocado '.name= nameMethod'
      // Accede a la información del metodo controlador actual
      context.getHandler(),
      // // Contiene el tipo de controllador de la clase a la que pertenece ese controlador '.name= NameController'
      context.getClass(),
    ]);


    if (isPublic) {
      return true;
    }

    // Obtenemos el objeto de solicitud HTTP mediante los siguientes metodos (toda la información de la solicitud)
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // Modifica el request antes de ejecutarlo en el controlador
      request.user = payload;
      console.log(request.user);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}