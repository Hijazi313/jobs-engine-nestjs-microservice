import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';
import { OnModuleInit } from '@nestjs/common';

//what this class is doing and why is it abstract and onMessage
export abstract class PulsarConsumer implements OnModuleInit {
  private consumer!: Consumer;
  constructor(
    private readonly pulsarCLient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarCLient.createConsumer(
      this.topic,
      this.onMessage.bind(this)
    );
  }

  protected async acknowledge(message: Message) {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(message: Message): Promise<void>;
}
