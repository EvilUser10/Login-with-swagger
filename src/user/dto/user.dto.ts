import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class UserDto {

  @AutoMap()
  @ApiProperty()
  username: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

}
