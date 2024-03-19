import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from "./user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto extends UserDto {

  @IsString()
  @IsNotEmpty()
  password: string;
}
