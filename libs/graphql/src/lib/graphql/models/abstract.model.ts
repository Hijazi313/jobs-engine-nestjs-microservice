import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class AbstractModel {
  @Field(() => ID)
  id: number;
}
