import { AbstractModel } from '@jobber-microservice/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field(() => String)
  email: string;
}
