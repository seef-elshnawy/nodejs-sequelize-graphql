import DataLoader from "dataloader";
import { Post } from "../models/posts";
import { User } from "../models/User";
import { React } from "../models/React";

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

const batchPostsLength = async (ids: string[]) => {
  const posts = await Post.findAll({ where: { userId: ids } });
  return ids.map(() => posts.length);
};

const batchUserScore = async (ids: string[]) => {
  const posts = (await Post.findAll({ where: { userId: ids } }));
  const reacts = (await React.findAll({ where: { userId: ids } }));
  const mapScore=(id:string)=>{
    const postLength=posts.filter(post=> post.userId === id).length
    const reactLength=reacts.filter(react=> react.userId === id).length
    return (((postLength + reactLength)/7) * 100).toFixed(2)
  }
  return ids.map((id) => mapScore(id));
};

const batchUserReact = async (ids: string[]) => {
  // const date = reacts.filter((l) => (l.createdAt = Date.apply(l.createdAt)));
  // console.log(date);
  try {
    const reacts = await React.findAll({ where: { userId: ids } });
    const posts = await Post.findAll({ where: { userId: ids } });

  const days=(id:string)=>({
    [id]:{
    ["Saturday"]:{
      reacts:reacts.filter(r=> r.createdAt.getDay()===6  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===6  && r.userId===id).length,
    },
    ["Sunday"]:{
      reacts:reacts.filter(r=> r.createdAt.getDay()===0  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===0 && r.userId===id).length
    },
    ["Monday"]: {
      reacts:reacts.filter(r=> r.createdAt.getDay()===1  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===1  && r.userId===id).length
    },
    ["Tuesday"]:{
      reacts:reacts.filter(r=> r.createdAt.getDay()===2  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===2 && r.userId===id).length
    },
    ["Wednesday"]:{
      reacts:reacts.filter(r=> r.createdAt.getDay()===3  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===3 && r.userId===id).length
    },
    ["Thursday"]:{
      reacts:reacts.filter(r=> r.createdAt.getDay()===4  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===4  && r.userId===id).length
    },
    ["Friday"]:{
      reacts:reacts.filter(r=> r.createdAt.getDay()===5  && r.userId===id).length,
      posts: posts.filter(r=> r.createdAt.getDay()===5 && r.userId===id).length
    },
  }
  })
    return ids.map((id) => days(id)[id]||[]);
  } catch (err) {
    return err;
  }
};
//@ts-expect-error
export const postDataLoader = new DataLoader<string, User>(batchUser);
//@ts-expect-error
export const ReactDataLoader = new DataLoader<string, User>(batchUserReact);
//@ts-expect-error
export const PostLengthDataLoader = new DataLoader<string, User>(batchPostsLength);
//@ts-expect-error
export const ScoreDataLoader = new DataLoader<string, User>(batchUserScore);
