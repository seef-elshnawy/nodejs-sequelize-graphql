import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UserInput {
  @IsString()
  @Field()
  fullName?: string;
  @IsString()
  @Field()
  age?: string;
  @IsString()
  @Field()
  password?: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email?: string;
}

@ArgsType()
export class ReactInput {
  @IsString()
  @Field()
  userId?: string;
  @IsString()
  @Field()
  postId?: string;
}
