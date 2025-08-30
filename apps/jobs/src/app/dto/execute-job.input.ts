import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { Jobs } from '@jobber-microservice/nestjs';
@InputType()
export class ExecuteJobInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(Jobs)
  name: string;

  @Field(() => JSON)
  @IsNotEmpty()
  data: object | object[];
}
