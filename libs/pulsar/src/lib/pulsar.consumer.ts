import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';
import { Logger, OnModuleInit } from '@nestjs/common';
import { deserialize } from './serialize';

//what this class is doing and why is it abstract and onMessage
// export abstract class PulsarConsumer implements OnModuleInit {
export abstract class PulsarConsumer<T> {
  private consumer!: Consumer;
  protected readonly logger = new Logger(this.topic);
  constructor(
    private readonly pulsarCLient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarCLient.createConsumer(
      this.topic,
      this.listener.bind(this)
    );
  }

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData());
      this.logger.debug(`Received message: ${JSON.stringify(data)}`);
    } catch (error) {
      this.logger.error(error);
    } finally {
      await this.consumer.acknowledge(message);

      // await this.acknowledge(message);
    }
  }
  // protected async acknowledge(message: Message) {
  // }

  protected abstract onMessage(message: T): Promise<void>;
}
