import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SigInDto } from '../dto/signin-user.dto';
import { AuthGuard } from '../guard/auth.guard';
import { Public } from '../decorators/public.decorators';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() sigInDto: SigInDto) {
    return this.authService.signIn(sigInDto.username, sigInDto.password)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
