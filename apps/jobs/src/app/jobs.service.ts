import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { JOB_METADATA_KEY } from './decorators/job.decorator';
import { AbstractJob } from './jobs/abstract.job';
import { IJobMetadata } from './interfaces/job-metadata.interface';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<IJobMetadata>[];
  // private jobs: DiscoveredClassWithMeta<AbstractJob>[] = [];
  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    this.jobs =
      await this.discoveryService.providersWithMetaAtKey<IJobMetadata>(
        // await this.discoveryService.providersWithMetaAtKey<AbstractJob>(
        JOB_METADATA_KEY
      );
    console.log(this.jobs);
  }

  async getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(name: string, data: object) {
    console.log('this.jobs');
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} not found`);
    }
    if (!(job.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        `Job ${name} is not an instance of AbstractJob`
      );
    }
    await job.discoveredClass.instance.execute(data, job.meta.name);
    return job.meta;
  }
}
