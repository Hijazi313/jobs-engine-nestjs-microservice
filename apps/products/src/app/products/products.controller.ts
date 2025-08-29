import {
  CreateProductRequest,
  CreateProductResponse,
  GrpcLoggingInterceptor,
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@jobber-microservice/grpc';
import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
@ProductsServiceControllerMethods()
@UseInterceptors(GrpcLoggingInterceptor)
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productsService: ProductsService) {}
  createProduct(request: CreateProductRequest): CreateProductResponse {
    return this.productsService.createProduct(request);
  }
}
