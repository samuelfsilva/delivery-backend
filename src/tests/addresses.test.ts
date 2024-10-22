import { describe, it, expect } from 'vitest';
import { Address } from '../entities/addresses';
import { AppDataSource } from '../database/data-source';

describe('Address Entity', () => {
  it('should create a new address', async () => {
    const address = new Address();
    address.description = 'Test Address';
    address.postalCode = '12345-678';
    address.state = 'RJ';
    address.city = 'Rio de Janeiro';
    address.street = 'Avenida Rio Branco';
    address.number = 1000;

    const saved = await AppDataSource.manager.save(address);

    expect(saved).toHaveProperty('id');
    expect(saved.description).toBe('Test Address');
    expect(saved.postalCode).toBe('12345-678');
    expect(saved.state).toBe('RJ');
    expect(saved.city).toBe('Rio de Janeiro');
    expect(saved.street).toBe('Avenida Rio Branco');
    expect(saved.number).toBe(1000);
  });
  it('should update a address', async () => {
    const address = new Address();
    address.description = 'Test Address';
    address.postalCode = '12345-678';
    address.state = 'RJ';
    address.city = 'Rio de Janeiro';
    address.street = 'Avenida Rio Branco';
    address.number = 1000;

    const saved = await AppDataSource.manager.save(address);

    await AppDataSource
    .manager
    .update(
      Address, 
      { id: saved.id }, 
      { 
        description: 'Test Update Address',
        street: 'Avenida Presidente Vargas',
        number: 2000
      })

    const select = await AppDataSource
    .getRepository(Address)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.description).toBe('Test Update Address');
    expect(select?.street).toBe('Avenida Presidente Vargas');
    expect(select?.number).toBe(2000);
  });
  it('should delete a group', async () => {
    const address = new Address();
    address.description = 'Test Delete Address';
    address.postalCode = '12345-678';
    address.state = 'RJ';
    address.city = 'Rio de Janeiro';
    address.street = 'Avenida Rio Branco';
    address.number = 1000;

    const saved = await AppDataSource.manager.save(address);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Address, 
      { id: savedId })

    const salect = await AppDataSource
    .getRepository(Address)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: savedId })
    .getOne()
    
    expect(salect).toBeNull();
  });
});
