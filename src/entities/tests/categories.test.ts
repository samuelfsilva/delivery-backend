import { describe, it, expect } from 'vitest';
import { Categories } from '../categories';
import { AppDataSource } from '../../database/data-source';

describe('Category Entity', () => {
  it('should create a new category', async () => {
    const category = new Categories();
    category.description = 'Test Category';

    const saved = await AppDataSource.manager.save(category);

    expect(saved).toHaveProperty('id');
    expect(saved.description).toBe('Test Category');
  });
  it('should update a category', async () => {
    const category = new Categories();
    category.description = 'Test Category';

    const saved = await AppDataSource.manager.save(category);

    await AppDataSource
    .manager
    .update(
      Categories, 
      { id: saved.id }, 
      { description: 'Test Update Category' })

    const select = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .where("categories.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.description).toBe('Test Update Category');
  });
  it('should delete a category', async () => {
    const category = new Categories();
    category.description = 'Test Delete Category';

    const saved = await AppDataSource.manager.save(category);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Categories, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .where("categories.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
