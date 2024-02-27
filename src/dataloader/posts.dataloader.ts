import DataLoader from "dataloader";
import { Post } from "../models/posts";
import { User } from "../models/User";

const batchUser = async (ids: string[]) => {
  const posts = await Post.findAll({ where: { userId: ids } });
  console.log(posts, "posts");
  const postMap: { [usderId: string]: Post[] } = {};
  posts?.forEach((post) => {
    postMap[post.userId!] = postMap[post.userId!]
      ? [...postMap[post.userId!], post]
      : [post];
  });
  return ids.map((id) => postMap[id] || []);
};
//@ts-expect-error
export const postDataLoader = (batch) => new DataLoader<string, User>(batch);
