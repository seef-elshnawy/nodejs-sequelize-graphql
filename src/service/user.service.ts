import DataLoader from "dataloader";
import { User } from "../models/User";
import { postDataLoader } from "./../dataloader/posts.dataloader";
import { Post } from "../models/posts";
import { React } from "../models/React";
import { ReactInput } from "../validators/user.input";
import { ForbiddenError } from "apollo-server-core";

let instance: any;

export class userService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  async patchPosts(ids: string[]) {
    const posts = await Post.findAll({ where: { userId: ids } });
    const postMap: { [key: string]: Post[] } = {};
    posts?.forEach((post) => {
      postMap[post.userId!] = postMap[post.userId!]
        ? [...postMap[post.userId!], post]
        : [post];
    });
    return ids.map((id) => postMap[id] || []);
  }

  async PatchPostsLength(ids: string[]) {
    const posts = await Post.findAll({ where: { userId: ids } });
    return ids.map(() => posts.length);
  }

  async getPostsByUser(id: string) {
    return await postDataLoader(this.patchPosts).load(id);
  }
  async getPostLength(id: string) {
    return await postDataLoader(this.PatchPostsLength).load(id);
  }
  async getUserRate(userId: string) {
    return;
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
