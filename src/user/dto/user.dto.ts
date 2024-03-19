import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
export class UserDto {

  @IsString({ 'message': 'Escriba un nombre válido.' })
  @Length(8, 20, { 'message': 'Escriba' })
  username: string;

  @IsEmail()
  email?: string;

  // Mas campos...

}