import { IsRepeated } from 'src/validation/is-repeated.constraint';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { UserDoesNotExist } from '../../validation/user-does-not-exist.constraint';

@InputType('UserAddInput')
export class CreateUserDto {
  @Length(5)
  @UserDoesNotExist()
  @Field()
  username: string;

  @Length(8)
  @Field()
  password: string;

  @Length(8)
  @Field()
  @IsRepeated('password')
  retypedPassword: string;

  @Length(2)
  @Field()
  firstName: string;

  @Length(2)
  @Field()
  lastName: string;

  @IsEmail()
  @UserDoesNotExist()
  @Field()
  email: string;
}
