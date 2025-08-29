import { LoadProductsMessage, PulsarClient } from '@jobber-microservice/pulsar';
import { Job } from '../../decorators/job.decorator';
import { Jobs } from '@jobber-microservice/nestjs';
import { AbstractJob } from '../abstract.job';

@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Load products from the database',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
