import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  //   imports: [DatabaseModule],
  providers: [ProductsService],
  //   exports: [ProductsService],
})
export class ProductsModule {}
