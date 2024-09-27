import { describe, it, expect } from 'vitest';
import { Categories } from '../categories';
import { AppDataSource } from '../../database/data-source';

describe('Category Entity', () => {
  it('should create a new category', async () => {
    const category = new Categories();
    category.description = 'Test Category';

    const savedCategory = await AppDataSource.manager.save(category);

    expect(savedCategory).toHaveProperty('id');
    expect(savedCategory.description).toBe('Test Category');
  });
});
