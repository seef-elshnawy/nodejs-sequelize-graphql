import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./posts";

@Table({ tableName: "React" })
@ObjectType()
export class React extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @Field()
  id: string;

  @Field()
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @Field()
  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
  })
  postId: string;

  @HasOne(() => User, "postId")
  user: User;

  @HasOne(() => Post, "postId")
  post: Post;
}
