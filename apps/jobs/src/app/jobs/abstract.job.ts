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
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    if (Array.isArray(data)) {
      for (const message of data) {
        await this.validateData(message);
        await this.send(message);
      }
    } else {
      await this.validateData(data);
      await this.send(data);
    }
    // await this.producer.send({
    //   data: serialize(data),
    // });
  }

  async send(data: T) {
    return this.producer.send({
      data: serialize(data),
    });
  }

  private async validateData(data: T) {
    console.log({ data });
    const instance = plainToInstance(this.messageClass, data);
    const errors = await validate(instance);
    console.log({ errors, instance });
    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }
  }
}
