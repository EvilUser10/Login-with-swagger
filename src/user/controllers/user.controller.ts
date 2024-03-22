import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/rol.enum';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }
  // Para que se ejecute, necesita devolver en el auth.guard true, en este caso se verificará el token
  @Get('profile')
  getProfile(@Request() req) {
    // El request lo modificamos en el guard
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findUserById(+id);
  }


  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
