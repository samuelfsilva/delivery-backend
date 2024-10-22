import { describe, it, expect } from 'vitest';
import { Store } from '../entities/store';
import { AppDataSource } from '../database/data-source';

describe('Store Entity', () => {
  it('should create a new store', async () => {
    const store = new Store();
    store.createdAt = new Date();
    store.isActive = true;
    store.storeName = 'Test Store';
    store.storeDescription = 'Test Store';

    const saved = await AppDataSource.manager.save(store);

    expect(saved).toHaveProperty('id');
    expect(saved.createdAt).toBeInstanceOf(Date);
    expect(saved.isActive).toBe(true);
    expect(saved.storeName).toBe('Test Store');
    expect(saved.storeDescription).toBe('Test Store');
  });
  it('should update a store', async () => {
    const store = new Store();
    store.createdAt = new Date();
    store.isActive = true;
    store.storeName = 'Test Store';
    store.storeDescription = 'Test Store';

    const saved = await AppDataSource.manager.save(store);

    await AppDataSource
    .manager
    .update(
      Store, 
      { id: saved.id }, 
      { 
        storeName: 'Test Update Store',
        storeDescription: 'Test Update Store'
      })

    const select = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.storeName).toBe('Test Update Store');
    expect(select?.storeDescription).toBe('Test Update Store');
  });
  it('should delete a group', async () => {
    const store = new Store();
    store.createdAt = new Date();
    store.isActive = true;
    store.storeName = 'Test Store';
    store.storeDescription = 'Test Store';

    const saved = await AppDataSource.manager.save(store);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Store, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});

