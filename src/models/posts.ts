import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import {
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Table,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { React } from "./React";

@Table({ tableName: "PostTest" })
@ObjectType()
export class Post extends Model {
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
  post?: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId?: string;

  @BelongsTo(() => User, "id")
  user?: User;

  @HasMany(() => React, "postId")
  reacts: React[];
}
