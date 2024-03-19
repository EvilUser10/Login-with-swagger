import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [UserService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  exports: [AuthService]
})
export class AuthModule { }
