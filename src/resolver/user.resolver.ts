import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../models/User";
import { ReactsDate } from "../types";
import { ReactInput, UserInput } from "../validators/user.input";
import { Post } from "../models/posts";
import { UserLoader } from "../interface/post.dataloader";
import { userService } from "../service/user.service";
import { React } from "../models/React";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return User.findAll();
  }

  @Mutation(() => User)
  async addUser(@Args() userInput: UserInput) {
    //@ts-expect-error
    const user = await User.create(userInput);
    return user;
  }
  @FieldResolver(() => [Post], { nullable: true })
  async getPosts(@Root() { id }: User) {
    return userService.getPostsByUser(id!);
  }
  @FieldResolver(() => Number, { nullable: true })
  async getPostsLength(@Root() { id }: User) {
    const values = await userService.getPostLength(id);
    return values;
  }
  @FieldResolver(() => Number, { nullable: true })
  async getUserScore(@Root() { id }: User) {
    return await userService.getUserRate(id);
  }
  @FieldResolver(() => ReactsDate, { nullable: true })
  async getUserReact(@Root() { id }: User) {
    const values = await userService.getUserReact(id);
    return values;
  }
  @Mutation(() => React)
  async addReact(@Args() input: ReactInput) {
    return userService.addReact(input);
  }
}
