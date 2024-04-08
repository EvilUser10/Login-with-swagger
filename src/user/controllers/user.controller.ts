import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/rol.enum';
import { Public } from 'src/auth/decorators/public.decorators';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }
  // Para que se ejecute, necesita devolver en el auth.guard true, en este caso se verificará el token
  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User info found.'})
  @ApiResponse({ status: 401, description: 'Auth required.'})
  getProfile(@Request() req) {
    // El request lo modificamos en el guard
    return req.user;
  }

  @Public()
  @Get('')
  findAll() {
    return this.userService.findAllUsers();
  }

  // @Roles(Role.Admin)
  @ApiBearerAuth('JWT')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findUserById(+id);
  }


  @Roles(Role.Admin)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
