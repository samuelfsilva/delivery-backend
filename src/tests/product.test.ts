import { describe, it, expect } from 'vitest';
import { Product } from '../entities/product';
import { AppDataSource } from '../database/data-source';

describe('Product Entity', () => {
  it('should create a new product', async () => {
    const product = new Product();
    product.description = 'Test Product';
    product.isActive = true;
    product.price = 10.99;
    product.previousPrice = 12.99;
    product.details = 'This is a test product';

    const saved = await AppDataSource.manager.save(product);

    expect(saved).toHaveProperty('id');
    expect(saved.description).toBe('Test Product');
  });
  it('should update a product', async () => {
    const product = new Product();
    product.description = 'Test Product';
    product.isActive = true;
    product.price = 10.99;
    product.previousPrice = 12.99;
    product.details = 'This is a test product';

    const saved = await AppDataSource.manager.save(product);

    await AppDataSource
    .manager
    .update(
      Product, 
      { id: saved.id }, 
      { description: 'Test Update Product' })

    const select = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.description).toBe('Test Update Product');
  });
  it('should delete a product', async () => {
    const product = new Product();
    product.description = 'Test Delete Product';
    product.isActive = true;
    product.price = 10.99;
    product.previousPrice = 12.99;
    product.details = 'This is a test product';

    const saved = await AppDataSource.manager.save(product);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Product, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
