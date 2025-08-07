import { Injectable } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@jobber-microservice/pulsar';
import { iterate } from 'fibonacci';
import { FibonacciData } from './fibonacci-data.message';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer<FibonacciData> {
  constructor(private readonly pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(message: FibonacciData): Promise<void> {
    console.log('FibonacciConsumer.OnMessage');
    const result = iterate(message.iterations);
    this.logger.log(`Fibonacci result: ${result}`);
    // await this.acknowledge(message);
  }
}
