import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Store } from '../entities/store';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const storeSchema = Joi.object({
  storeName: Joi.string().required(),
  storeDescription: Joi.string().required()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = storeSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { storeName, storeDescription } = req.body;

  const storeExists = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("store")
    .where("store.storeName = :storeName", { storeName: storeName })
    .getOne();

  if (storeExists) return res.status(400).send('Store already registered');

  const store = new Store();
  store.storeName = storeName;
  store.storeDescription = storeDescription;
  store.createdAt = new Date();
  store.isActive = true;

  await AppDataSource.manager.save(store);

  res.status(201).json(store);
});

router.get('/', async (req: Request, res: Response) => {
  const stores = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("store")
    .getMany();
  
  res.send(stores);
});

router.get('/active', async (req: Request, res: Response) => {
  const stores = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("store")
    .where("store.isActive = :isActive", { isActive: 1 })
    .getMany();
  
  res.send(stores);
});

router.get('/:id', async (req: Request, res: Response) => {
  const store = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("store")
    .where("store.id = :id", { id: req.params.id })
    .getOne();
  
  res.status(201).json(store);
});

router.put('/:id', async (req: Request, res: Response) => {
  const store = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("store")
    .where("store.id = :id", { id: req.params.id })
    .getOne();
  
  if (!store) return res.status(400).send('Store not found');
  
  await AppDataSource
    .manager
    .update(
      Store, 
      { id: store.id }, 
      { 
        storeName: req.body.storeName,
        storeDescription: req.body.storeDescription,
        isActive: req.body.isActive
      })

  res.status(201).json(store);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const store = await AppDataSource
    .getRepository(Store)
    .createQueryBuilder("store")
    .where("store.id = :id", { id: req.params.id })
    .getOne();
  
  if (!store) return res.status(400).send('Store not found');
  
  await AppDataSource
    .manager
    .delete(
      Store, 
      { id: store.id })
  
  res.send(store);
});

export default router;
