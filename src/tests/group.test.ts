import { describe, it, expect } from 'vitest';
import { Group } from '../entities/group';
import { AppDataSource } from '../database/data-source';

describe('Group Entity', () => {
  it('should create a new group', async () => {
    const group = new Group();
    group.description = 'Test Group';

    const saved = await AppDataSource.manager.save(group);

    expect(saved).toHaveProperty('id');
    expect(saved.description).toBe('Test Group');
  });
  it('should update a group', async () => {
    const group = new Group();
    group.description = 'Test Group';

    const saved = await AppDataSource.manager.save(group);

    await AppDataSource
    .manager
    .update(
      Group, 
      { id: saved.id }, 
      { description: 'Test Update Group' })

    const select = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where("group.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.description).toBe('Test Update Group');
  });
  it('should delete a group', async () => {
    const group = new Group();
    group.description = 'Test Delete Group';

    const saved = await AppDataSource.manager.save(group);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Group, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where("group.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
