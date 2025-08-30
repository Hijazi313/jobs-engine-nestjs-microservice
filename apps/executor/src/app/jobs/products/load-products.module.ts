import { Module } from '@nestjs/common';
import { LoadProductsConsumer } from './load-products.consumer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Packages } from '@jobber-microservice/grpc';
import { join } from 'node:path';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Packages.PRODUCTS,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('PRODUCTS_GRPC_SERVICE_URL'),
            package: Packages.PRODUCTS,
            protoPath: join(__dirname, '../../libs/grpc/proto/products.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [LoadProductsConsumer],
})
export class LoadProductsModule {}
