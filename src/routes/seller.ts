import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Seller } from '../entities/seller';
import { User } from '../entities/user';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const sellerSchema = Joi.object({
  documentNumber: Joi.string().required(),
  userId: Joi.string().required()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = sellerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { documentNumber, userId } = req.body;

  const sellerExists = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.documentNumber = :documentNumber", { documentNumber: documentNumber })
    .getOne();

  if (sellerExists) return res.status(400).send('Seller already registered');

  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .getOne();

  if (!user) return res.status(400).send('Store not found');

  const seller = new Seller();
  seller.createdAt = new Date();
  seller.documentNumber = documentNumber;
  seller.isActive = true;
  seller.user = user;

  await AppDataSource.manager.save(seller);

  res.status(201).json(seller);
});

router.get('/', async (req: Request, res: Response) => {
  const sellers = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .getMany();
  
  res.send(sellers);
});

router.get('/active', async (req: Request, res: Response) => {
  const sellers = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.isActive = :isActive", { isActive: 1 })
    .getMany();
  
  res.send(sellers);
});

router.get('/:id', async (req: Request, res: Response) => {
  const seller = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.id = :id", { id: req.params.id })
    .getOne();
  
  res.status(201).json(seller);
});

router.put('/:id', async (req: Request, res: Response) => {
  const seller = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.id = :id", { id: req.params.id })
    .getOne();
  
  if (!seller) return res.status(400).send('Seller not found');
  
  await AppDataSource
    .manager
    .update(
      Seller, 
      { id: seller.id }, 
      { 
        isActive: req.body.isActive
      })

  res.status(201).json(seller);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const seller = await AppDataSource
    .getRepository(Seller)
    .createQueryBuilder("seller")
    .where("seller.id = :id", { id: req.params.id })
    .getOne();
  
  if (!seller) return res.status(400).send('Seller not found');
  
  await AppDataSource
    .manager
    .delete(
      Seller, 
      { id: seller.id })
  
  res.send(seller);
});

export default router;

