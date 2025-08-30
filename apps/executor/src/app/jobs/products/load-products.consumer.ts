import {
  Packages,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@jobber-microservice/grpc';
import { Jobs } from '@jobber-microservice/nestjs';
import {
  LoadProductsMessage,
  PulsarClient,
  PulsarConsumer,
} from '@jobber-microservice/pulsar';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class LoadProductsConsumer
  extends PulsarConsumer<LoadProductsMessage>
  implements OnModuleInit
{
  private productsService: ProductsServiceClient;
  constructor(
    private readonly pulsarClient: PulsarClient,
    @Inject(Packages.PRODUCTS) private readonly client: ClientGrpc
  ) {
    super(pulsarClient, Jobs.LOAD_PRODUCTS);
  }

  async onModuleInit(): Promise<void> {
    this.productsService = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME
    );
    await super.onModuleInit();
  }

  protected async onMessage(message: LoadProductsMessage): Promise<void> {
    console.log('LoadProductsConsumer.OnMessage', message);
    await firstValueFrom(
      this.productsService.createProduct({
        ...message,
      })
    );
  }
}
