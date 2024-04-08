import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/signin-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from '../decorators/public.decorators';
import { SignUpDto } from '../dto/signup-user.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { UserEntity } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  
  @Post('login')
  signIn(@Body() sigInDto: SignInDto) {
    return this.authService.signIn(sigInDto)
  }

  @Public()
  @UseInterceptors(MapInterceptor(SignUpDto, UserEntity))
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }
}
