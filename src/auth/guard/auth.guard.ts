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

  // context contiene la información sobre el contexto de ejecución de la solicitud HTTP
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // reflector: obtiene los metadatos mediante el decorador SetMetaData en IS_PUBLIC_KEY
    // getAllAndOverride: obtiene los metadatos de las fuentes proporcionadas en orden
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      // Contiene la referencia al controlador que está a punto de ser invocado '.name= nameMethod'
      context.getHandler(),
      // Contiene el tipo de controllador de la clase a la que pertenece ese controlador '.name= NameController'
      context.getClass(),
    ]);
    
    console.log(isPublic);

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
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}