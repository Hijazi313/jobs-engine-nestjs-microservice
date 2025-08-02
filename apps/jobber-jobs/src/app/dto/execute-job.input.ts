import { IsNotEmpty, IsObject } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
@InputType()
export class ExecuteJobInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => JSON)
  @IsObject()
  @IsNotEmpty()
  data: object;
}
