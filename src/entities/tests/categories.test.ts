import { describe, it, expect } from 'vitest';
import { dataSource } from '../../database/setup-test';
import { Categories } from '../categories';

describe('Category Entity', () => {
  it('should create a new category', async () => {
    const category = new Categories();
    category.description = 'Test Category';

    const savedCategory = await dataSource.manager.save(category);

    expect(savedCategory).toHaveProperty('id');
    expect(savedCategory.description).toBe('Test Category');
  });
});
