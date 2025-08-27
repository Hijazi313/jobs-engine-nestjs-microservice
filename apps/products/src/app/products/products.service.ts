import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as productsSchema from './schema';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof productsSchema>
  ) {}

  async createProduct(
    product: Omit<
      typeof productsSchema.products.$inferSelect,
      'id' | 'createdAt' | 'updatedAt'
    >
  ) {
    return this.db.insert(productsSchema.products).values(product).returning();
  }
}
