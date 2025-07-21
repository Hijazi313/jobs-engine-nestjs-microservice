import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private pulsarClient: Client;

  constructor(private readonly configService: ConfigService) {
    this.pulsarClient = new Client({
      serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }
  async createProducer(topic: string) {
    return this.pulsarClient.createProducer({
      topic,
    });
  }

  async onModuleDestroy() {
    await this.pulsarClient.close();
  }
}
