import { Injectable } from '@nestjs/common';
import {
  FibonacciMessage,
  PulsarClient,
  PulsarConsumer,
} from '@jobber-microservice/pulsar';
import { iterate } from 'fibonacci';
import { Jobs } from '@jobber-microservice/nestjs';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer<FibonacciMessage> {
  constructor(private readonly pulsarClient: PulsarClient) {
    super(pulsarClient, Jobs.FIBONACCI);
  }

  protected async onMessage(message: FibonacciMessage): Promise<void> {
    console.log('FibonacciConsumer.OnMessage');
    const result = iterate(message.iterations);
    this.logger.log(`Fibonacci result: ${result}`);
    // await this.acknowledge(message);
  }
}
