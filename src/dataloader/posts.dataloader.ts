import DataLoader from "dataloader";
import { Post } from "../models/posts";
import { User } from "../models/User";
import { React } from "../models/React";
import { Op } from "sequelize";

const batchUser = async (ids: string[]) => {
  const posts = await Post.findAll({ where: { userId: ids } });
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
  const posts = await Post.findAll({ where: { userId: ids } });
  const reacts = await React.findAll({ where: { userId: ids } });
  const mapScore = (id: string) => {
    const postLength = posts.filter((post) => post.userId === id).length;
    const reactLength = reacts.filter((react) => react.userId === id).length;
    return (((postLength + reactLength) / 7) * 100).toFixed(2);
  };
  return ids.map((id) => mapScore(id));
};

const batchUserReact = async (ids: string[]) => {
  // const date = reacts.filter((l) => (l.createdAt = Date.apply(l.createdAt)));
  // console.log(date);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  try {
    const reacts = await React.findAll({
      where: {
        userId: ids,
        createdAt: {
          [Op.gte]: oneWeekAgo,
          [Op.lte]: Date.now(),
        },
      },
    });
    const posts = await Post.findAll({
      where: {
        userId: ids,
        createdAt: {
          [Op.gte]: oneWeekAgo,
          [Op.lte]: Date.now(),
        },
      },
    });

    function getAllDaysOfweek(data: Date) {
      const startOfWeek = new Date(data);
      const daysOfWeekTimestamps = [];
      const dayOfWeek = startOfWeek.getDay();
      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const daysToSubtract = (dayOfWeek + 2) % 7;
      startOfWeek.setTime(
        startOfWeek.getTime() - daysToSubtract * millisecondsInDay
      );
      startOfWeek.setHours(0, 0, 0, 0);

      for (let i = 0; i < 7; i++) {
        const currentDayTimeStamp =
          startOfWeek.getTime() + i * millisecondsInDay;
        daysOfWeekTimestamps.push(currentDayTimeStamp);
      }
      return daysOfWeekTimestamps;
    }
    const uniqueArr: string[] = [];
    posts.map((s) => {
      //@ts-expect-error
      if (!uniqueArr.map((x) => x.getDate()).includes(s.createdAt.getDate())) {
        uniqueArr.push(s.createdAt);
      }
    });
    reacts.map((s) => {
      //@ts-expect-error
      if (!uniqueArr.map((x) => x.getDate()).includes(s.createdAt.getDate())) {
        uniqueArr.push(s.createdAt);
      }
    });
    const mapOnData = (id: string) => {
      const post = getAllDaysOfweek(new Date()).map((date) => ({
        [date]: {
          posts: posts.filter(
            (p) =>
              //  p.createdAt.getHours() >= new Date(post.createdAt).setHours(0, 0, 0, 0) &&
              //  p.createdAt.getHours <= new Date(post.createdAt).setHours(24, 0, 0, 0) &&
              p.createdAt.getDay() === new Date(date).getDay() &&
              id === p.userId
          ).length,
          reacts: reacts.filter(
            (p) =>
              // p.createdAt >= new Date(post.createdAt).setHours(0, 0, 0, 0) &&
              // p.createdAt <= new Date(post.createdAt).setHours(24, 0, 0, 0) &&
              p.createdAt.getDay() === new Date(date).getDay() &&
              id === p.userId
          ).length,
        },
      }));

      return post;
    };

    return ids.map((id) => mapOnData(id));
  } catch (err) {
    return err;
  }
};
//@ts-expect-error
export const postDataLoader = new DataLoader<string, User>(batchUser);
//@ts-expect-error
export const ReactDataLoader = new DataLoader<string, User>(batchUserReact);
export const PostLengthDataLoader = new DataLoader<string, User>(
  //@ts-expect-error
  batchPostsLength
);
//@ts-expect-error
export const ScoreDataLoader = new DataLoader<string, User>(batchUserScore);
