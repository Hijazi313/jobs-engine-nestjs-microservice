import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Packages } from '@jobber-microservice/grpc';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { init } from '@jobber-microservice/nestjs';
import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
  // Listen GRPC server
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: app.get(ConfigService).getOrThrow('PRODUCTS_GRPC_SERVICE_URL'),
      package: Packages.PRODUCTS,
      protoPath: join(process.cwd(), 'dist/libs/grpc/proto/products.proto'),
    },
  });
  await app.startAllMicroservices();
}

bootstrap();
