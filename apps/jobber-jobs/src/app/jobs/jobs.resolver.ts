import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job.input';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job])
  async jobs() {
    // Return empty array for now - implement actual logic later
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  async executeJob(@Args('input') input: ExecuteJobInput) {
    return this.jobsService.executeJob(input.name);
  }
}
