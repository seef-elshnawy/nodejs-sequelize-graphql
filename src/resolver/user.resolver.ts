import { Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { UserTypes } from "../types";
@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return User.findAll();
  }
}
