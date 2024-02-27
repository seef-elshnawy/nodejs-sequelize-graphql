import { Sequelize } from "sequelize";
import {
  DataType,
  Column,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./posts";

@ObjectType()
@Table({ tableName: "UserTest" })
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @Field()
  id?: string;
  @Column({
    type: DataType.STRING,
  })
  @Field()
  fullName?: string;
  @Column({
    type: DataType.STRING,
  })
  @Field()
  password?: string;
  @Column({
    type: DataType.STRING,
  })
  @Field()
  age?: number;
  @Column({
    type: DataType.STRING,
  })
  @Field()
  email?: string;

  @HasMany(() => Post, "id")
  post?: Post[];
}
