import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { json } from 'stream/consumers';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const userLogin = await this.userRepository.
      findOne({
        where: {
          username: loginUserDto.username,
          password: loginUserDto.password,
        }
      })
    console.log('login', userLogin);

    if (userLogin) {
      return {
        success: true,
        user: userLogin,
      }
    } else {
      return {
        success: false,
      }
    }
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username: username } })
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async verifyUser() {

  }
  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.userRepository.update({ id }, newId);
  // }





}
