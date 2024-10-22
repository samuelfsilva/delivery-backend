import { describe, it, expect } from 'vitest';
import { User } from '../entities/user';
import { AppDataSource } from '../database/data-source';

describe('User Entity', () => {
  it('should create a new user', async () => {
    const user = new User();
    user.createdAt = new Date();
    user.email = 'a@a.com';
    user.isActive = true;
    user.firstName = 'Test User';
    user.lastName = 'Create User';
    user.password = '123456';
    user.birthdate = new Date();
    user.updatedAt = new Date();

    const saved = await AppDataSource.manager.save(user);

    expect(saved).toHaveProperty('id');
    expect(saved.createdAt).toBeInstanceOf(Date);
    expect(saved.isActive).toBe(true);
    expect(saved.email).toBe('a@a.com');
    expect(saved.firstName).toBe('Test User');
  });
  it('should update a user', async () => {
    const user = new User();
    user.createdAt = new Date();
    user.email = 'a@a.com';
    user.isActive = true;
    user.firstName = 'Test User';
    user.lastName = 'Create User';
    user.password = '123456';
    user.birthdate = new Date();
    user.updatedAt = new Date();

    const saved = await AppDataSource.manager.save(user);

    await AppDataSource
    .manager
    .update(
      User, 
      { id: saved.id }, 
      { 
        firstName: 'Test Update User',
        lastName: 'Update User'
      })

    const select = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: saved.id })
    .getOne()
    
    expect(select).toHaveProperty('id');
    expect(select?.createdAt).toBeInstanceOf(Date);
    expect(select?.isActive).toBe(true);
    expect(select?.email).toBe('a@a.com');
    expect(select?.firstName).toBe('Test Update User');
    expect(select?.lastName).toBe('Update User');
  });
  it('should delete a group', async () => {
    const user = new User();
    user.createdAt = new Date();
    user.email = 'a@a.com';
    user.isActive = true;
    user.firstName = 'Test User';
    user.lastName = 'Create User';
    user.password = '123456';
    user.birthdate = new Date();
    user.updatedAt = new Date();

    const saved = await AppDataSource.manager.save(user);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      User, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});

