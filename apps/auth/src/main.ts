require('module-alias/register');
import { AUTH_PACKAGE_NAME } from '@jobber-microservice/grpc';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { init } from '@jobber-microservice/nestjs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  await init(app);

  // Listen GRPC server
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: app.get(ConfigService).getOrThrow('AUTH_GRPC_SERVICE_URL'),
      package: AUTH_PACKAGE_NAME,
      // protoPath: join(__dirname, 'proto/auth.proto'),
      // protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
      protoPath: join(process.cwd(), 'dist/libs/grpc/proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap();
