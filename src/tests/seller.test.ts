import { describe, it, expect } from 'vitest';
import { Seller } from '../entities/seller';
import { AppDataSource } from '../database/data-source';

describe('Seller Entity', () => {
  it('should create a new seller', async () => {
    const seller = new Seller();
    seller.createdAt = new Date();
    seller.documentNumber = '123456789';
    seller.isActive = true;

    const saved = await AppDataSource.manager.save(seller);

    expect(saved).toHaveProperty('id');
    expect(saved.createdAt).toBeInstanceOf(Date);
    expect(saved.documentNumber).toBe('123456789');
    expect(saved.isActive).toBeTruthy();
  });
  it('should update a seller', async () => {
    const seller = new Seller();
    seller.createdAt = new Date();
    seller.documentNumber = '123456789';
    seller.isActive = true;

    const saved = await AppDataSource.manager.save(seller);

    await AppDataSource
    .manager
    .update(
      Seller, 
      { id: saved.id }, 
      { documentNumber: '123454321' })

    const select = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.id = :id", { id: saved.id })
    .getOne()
    
    expect(select?.documentNumber).toBe('123454321');
  });
  it('should delete a seller', async () => {
    const seller = new Seller();
    seller.createdAt = new Date();
    seller.documentNumber = '123456789';
    seller.isActive = true;

    const saved = await AppDataSource.manager.save(seller);
    const savedId = saved.id;

    await AppDataSource
    .manager
    .delete(
      Seller, 
      { id: savedId })

    const sellerct = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.id = :id", { id: savedId })
    .getOne()
    
    expect(sellerct).toBeNull();
  });
});
