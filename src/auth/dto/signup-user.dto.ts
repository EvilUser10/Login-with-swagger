import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {

  // @AutoMap()
  // id: number; 

  @AutoMap()
  @IsString({ 'message': 'Escriba un nombre válido.' })
  @Length(8, 20, { 'message': 'Nombre de usuario entre 8 y 20 caracteres' })
  @ApiProperty()
  username: string;

  @AutoMap()
  @IsEmail()
  @ApiProperty()
  email: string


  @Length(8, 20, { 'message': 'Contraseña entre 8 y 20 caracteres' })
  @ApiProperty()
  password: string;
}