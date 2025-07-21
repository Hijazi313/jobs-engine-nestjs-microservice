import { PulsarClient } from '@jobber-microservice/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import { IFibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci sequence and store it in the DB',
})
export class FibonacciJob extends AbstractJob<IFibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
