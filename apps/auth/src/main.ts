import { AUTH_PACKAGE_NAME } from '@jobber-microservice/grpc';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { init } from '@jobber-microservice/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await init(app);

  // Listen GRPC server
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap();
