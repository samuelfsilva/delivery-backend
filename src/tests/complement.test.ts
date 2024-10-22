import { describe, it, expect } from 'vitest';
import { Complement } from '../entities/complement';
import { AppDataSource } from '../database/data-source';

describe('Complement Entity', () => {
  it('should create a new complement', async () => {
    const complement = new Complement();
    complement.description = 'Test Complement';
    complement.isActive = true;
    complement.weight = 1;

    const saved = await AppDataSource.manager.save(complement);

    expect(saved).toHaveProperty('id');
    expect(saved.description).toBe('Test Complement');
  });
  it('should update a complement', async () => {
    const complement = new Complement();
    complement.description = 'Test Complement';
    complement.isActive = true;
    complement.weight = 1;

    const saved = await AppDataSource.manager.save(complement);

    await AppDataSource
    .manager
    .update(
      Complement, 
      { id: saved.id }, 
      { description: 'Test Update Complement' })

    const select = await AppDataSource
    .getRepository(Complement)
    .createQueryBuilder("complement")
    .where("complement.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.description).toBe('Test Update Complement');
  });
  it('should delete a complement', async () => {
    const complement = new Complement();
    complement.description = 'Test Delete Complement';
    complement.isActive = true;
    complement.weight = 1;

    const saved = await AppDataSource.manager.save(complement);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Complement, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Complement)
    .createQueryBuilder("complement")
    .where("complement.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
