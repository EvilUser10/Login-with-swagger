import { AutoMap } from "@automapper/classes";
import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {

  @AutoMap()
  id: number; 

  @AutoMap()
  @IsString({ 'message': 'Escriba un nombre válido.' })
  @Length(8, 20, { 'message': 'Nombre de usuario entre 8 y 20 caracteres' })
  username: string;

  @AutoMap()
  @IsEmail()
  email: string


  @Length(8, 20, { 'message': 'Contraseña entre 8 y 20 caracteres' })
  password: string;
}