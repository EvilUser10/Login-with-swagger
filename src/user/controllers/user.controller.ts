import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto) {
    const loginUser = await this.userService.loginUser(LoginUserDto)
    if (loginUser.success) {
      return {
        success: true,
        message: 'Usuario logeado',
        user: loginUser,
      }
    } else {
      return {
        success: false,
        message: 'Usuario no logeado',
      }
    }
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findUserById(+id);
  }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
