import { IsString } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class PostInput {
  @IsString()
  @Field()
  post?: string;
  @IsString()
  @Field()
  userId?: string;
}
