import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UserProfile } from './services/userProfile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],

  controllers: [UserController],
  providers: [
    UserService,
    UserProfile,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [TypeOrmModule]
})

export class UserModule { }
