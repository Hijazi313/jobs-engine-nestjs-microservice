import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { IJobMetadata } from '../interfaces/job-metadata.interface';

export const JOB_METADATA_KEY = 'job_meta' as const;
export const Job = (meta: IJobMetadata) =>
  applyDecorators(SetMetadata(JOB_METADATA_KEY, meta), Injectable());
