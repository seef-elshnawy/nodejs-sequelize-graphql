import { Field, ObjectType } from "type-graphql";
import { React } from "./models/React";

export type UserTypes = {
  id: String;
  fullName: String;
  password: String;
  age: Number;
  email: String;
};

@ObjectType()
class values {
  @Field(() => Number)
  reacts: number;
  @Field(() => Number)
  posts: number;
}

@ObjectType()
export class ReactsDate {
  @Field(() => values)
  Saturday: {
    reacts: number;
    posts: number;
  };
  @Field(() => values)
  Sunday: {
    reacts: number;
    posts: number;
  };
  @Field(() => values)
  Monday: {
    reacts: number;
    posts: number;
  };
  @Field(() => values)
  Tuesday: {
    reacts: number;
    posts: number;
  };
  @Field(() => values)
  Wednesday: {
    reacts: number;
    posts: number;
  };
  @Field(() => values)
  Thursday: {
    reacts: number;
    posts: number;
  };
  @Field(() => values)
  Friday: {
    reacts: number;
    posts: number;
  };
}
