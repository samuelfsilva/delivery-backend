import { describe, it, expect } from 'vitest';
import { Sale } from '../entities/sale';
import { AppDataSource } from '../database/data-source';

describe('Sale Entity', () => {
  it('should create a new sale', async () => {
    const sale = new Sale();
    sale.isActive = true;
    sale.orderDate = new Date();
    sale.expectedDeliveryDate = new Date();
    sale.actualDeliveryDate = new Date();

    const saved = await AppDataSource.manager.save(sale);

    expect(saved).toHaveProperty('id');
    expect(saved.orderDate).toBeInstanceOf(Date);
    expect(saved.expectedDeliveryDate).toBeInstanceOf(Date);
    expect(saved.actualDeliveryDate).toBeInstanceOf(Date);
  });
  it('should update a sale', async () => {
    const sale = new Sale();
    sale.isActive = true;
    sale.orderDate = new Date();
    sale.expectedDeliveryDate = new Date();
    sale.actualDeliveryDate = new Date();

    const saved = await AppDataSource.manager.save(sale);
    const date = new Date();

    await AppDataSource
    .manager
    .update(
      Sale, 
      { id: saved.id }, 
      { actualDeliveryDate: date })

    const select = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.actualDeliveryDate).toBeInstanceOf(Date);
  });
  it('should delete a sale', async () => {
    const sale = new Sale();
    sale.isActive = true;
    sale.orderDate = new Date();
    sale.expectedDeliveryDate = new Date();
    sale.actualDeliveryDate = new Date();

    const saved = await AppDataSource.manager.save(sale);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Sale, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
