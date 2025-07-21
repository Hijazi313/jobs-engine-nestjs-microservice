import { OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'pulsar-client';
import { PulsarClient } from '@jobber-microservice/pulsar';

export abstract class AbstractJob<T> implements OnModuleDestroy {
  private producer: Producer;

  constructor(private readonly pulsarClient: PulsarClient) {
    // this.producer = pulsarClient.createProducer(this.topic);
  }

  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    await this.producer.send({
      data: Buffer.from(JSON.stringify(data)),
    });
  }

  async onModuleDestroy() {
    await this.producer.close();
  }
}
