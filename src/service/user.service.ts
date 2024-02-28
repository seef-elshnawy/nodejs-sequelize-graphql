import {
  PostLengthDataLoader,
  ReactDataLoader,
  ScoreDataLoader,
  postDataLoader,
} from "./../dataloader/posts.dataloader";
import { React } from "../models/React";
import { ReactInput } from "../validators/user.input";
import { ForbiddenError } from "apollo-server-core";

class UserService {
  async getPostsByUser(id: string) {
    return await postDataLoader.load(id);
  }
  async getPostLength(id: string) {
    return await PostLengthDataLoader.load(id);
  }
  async getUserRate(id: string) {
    return await ScoreDataLoader.load(id);
  }
  async getUserReact(id: string) {
    return await ReactDataLoader.load(id);
  }
  async addReact(reactInput: ReactInput) {
    const reacts = await React.findOne({
      where: { userId: reactInput.userId, postId: reactInput.postId },
    });
    if (reacts) throw new ForbiddenError("this react is already exist");
    return await React.create({
      postId: reactInput.postId,
      userId: reactInput.userId,
      createdAt: Date.now(),
    });
  }
}
export const userService = new UserService();
