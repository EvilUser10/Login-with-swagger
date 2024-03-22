import { DataSource } from "typeorm";
import { UserEntity } from "./user/entities/user.entity";

const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "users",
  entities: [UserEntity],
});