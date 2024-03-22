import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class UserEntity {
  
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

}
