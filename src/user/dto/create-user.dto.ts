import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  // Validaciones en el modulo actual...
  @IsString()
  @Length(8, 20)
  username: String;

  @IsEmail()
  email?: String;

  @IsString()
  password: String;

}
