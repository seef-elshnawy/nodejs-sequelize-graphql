import {
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Post } from "../models/posts";
import { UserInput } from "../validators/user.input";
import { PostInput } from "../validators/post.input";
import { Optional } from "sequelize";
import { User } from "../models/User";
import { Context } from "typegql";
import DataLoader from "dataloader";

@Resolver(Post)
export class PostsReslver {
  constructor(private post: Post) {}
  @Mutation(() => Post)
  async addPost(@Args() postInput: PostInput) {
    //@ts-expect-error
    return await Post.create(postInput);
  }
}
