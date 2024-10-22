import { describe, it, expect } from 'vitest';
import { SaleItem as Item } from '../entities/sale_items';
import { AppDataSource } from '../database/data-source';

describe('Item Entity', () => {
  it('should create a new item', async () => {
    const item = new Item();
    item.price = 10.99;
    item.quantity = 1;
    item.details = 'This is a test item';

    const saved = await AppDataSource.manager.save(item);

    expect(saved).toHaveProperty('id');
    expect(saved.quantity).toBe(1);
  });
  it('should update a item', async () => {
    const item = new Item();
    item.price = 10.99;
    item.quantity = 1;
    item.details = 'This is a test item';

    const saved = await AppDataSource.manager.save(item);

    await AppDataSource
    .manager
    .update(
      Item, 
      { id: saved.id }, 
      { details: 'This is a test item update' })

    const select = await AppDataSource
    .getRepository(Item)
    .createQueryBuilder("item")
    .where("item.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.details).toBe('This is a test item update');
  });
  it('should delete a item', async () => {
    const item = new Item();
    item.price = 10.99;
    item.quantity = 1;
    item.details = 'This is a test item delete';

    const saved = await AppDataSource.manager.save(item);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Item, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Item)
    .createQueryBuilder("item")
    .where("item.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
