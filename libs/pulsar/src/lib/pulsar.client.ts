import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client, Consumer, Message, Producer } from 'pulsar-client';
// TODO What all we are doing here and how the files extending this PulsarClient are going to use it?
@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private pulsarClient: Client;

  constructor(private readonly configService: ConfigService) {
    this.pulsarClient = new Client({
      serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }
  private readonly producers: Producer[] = [];
  private readonly consumers: Consumer[] = [];

  async createProducer(topic: string) {
    const producer = await this.pulsarClient.createProducer({
      topic,
      batchingEnabled: true,
    });
    this.producers.push(producer);
    return producer;
  }

  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.pulsarClient.subscribe({
      topic,
      subscription: 'jobber',
      listener,
    });
    this.consumers.push(consumer);
    return consumer;
  }

  async onModuleDestroy() {
    for (const producer of this.producers) {
      await producer.close();
    }
    await this.pulsarClient.close();
  }
}
