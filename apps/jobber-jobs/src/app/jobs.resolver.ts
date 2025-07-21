import { GqlAuthGuard } from '@jobber-microservice/nestjs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job.input';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Job])
  async jobs() {
    // Return empty array for now - implement actual logic later
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('input') input: ExecuteJobInput) {
    return this.jobsService.executeJob(input.name);
  }
}
