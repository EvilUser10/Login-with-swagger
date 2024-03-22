import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/signup-user.dto';
import { SignInDto } from 'src/auth/dto/signin-user.dto';
import * as bcrypt from 'bcrypt'
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
// import { UserProfile } from './userProfile.service';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }

  async createUser(signUpDto: SignUpDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.password = await bcrypt.hash(signUpDto.password, await bcrypt.genSalt());
    const userMap = this.mapper.map(signUpDto, SignUpDto, UserEntity);
    userMap.password = user.password;
    return await this.userRepository.save(userMap);
  }

  async loginUser(signInDto: SignInDto): Promise<boolean> {
    const user = await this.findByUsername(signInDto.username)
    if (!await bcrypt.compare(signInDto.password, user.password)) {
      return false
    }
    return true;
  }

  // async changePassword(changePasswordDto) {
  //   const user = await this.findByUsername(changePasswordDto.username)
  // }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username: username } })
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }






}
