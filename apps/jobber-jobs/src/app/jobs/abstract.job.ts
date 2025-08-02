import { Producer } from 'pulsar-client';
import { PulsarClient, serialize } from '@jobber-microservice/pulsar';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {
    // this.producer = pulsarClient.createProducer(this.topic);
  }

  async execute(data: T, job: string) {
    await this.validateData(data);
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    await this.producer.send({
      data: serialize(data),
    });
  }

  private async validateData(data: T) {
    const instance = plainToInstance(this.messageClass, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }
  }
}
