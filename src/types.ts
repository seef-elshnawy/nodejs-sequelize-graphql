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
  @Field(() => values,{nullable:true})
  Time: {
    reacts: number,
    post: number
  }
 
  
}
