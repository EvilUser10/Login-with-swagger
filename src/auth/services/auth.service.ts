import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { SignUpDto } from '../dto/signup-user.dto';
import { SignInDto } from '../dto/signin-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(sigInDto: SignInDto): Promise<{ access_token: string } & any> {
    const user = await this.usersService.findByUsername(sigInDto.username);
    // console.log(user);

    if (await this.usersService.loginUser(sigInDto)) {
      const payload = { user_id: user.id }
      return {
        user: user,
        access_token: await this.jwtService.signAsync(payload)
      }
    }
    return {
      error: 'credenciales incorrectas'
      
    }
  }

  async signUp(sigInDto: SignUpDto): Promise<any> {
    const user = await this.usersService.createUser(sigInDto)
    const payload = { sub: user.id, username: user.username }
    return {
      user,
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
