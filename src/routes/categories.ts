import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Categories } from '../entities/categories';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const categoriesSchema = Joi.object({
  description: Joi.string().optional()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = categoriesSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { description } = req.body;

  const categories = new Categories();
  categories.description = description;

  await AppDataSource.manager.save(categories);

  res.status(201).json(categories);
});

router.get('/', async (req: Request, res: Response) => {
  const categories = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .getMany();

  res.send(categories);
});

router.get('/:id', async (req: Request, res: Response) => {
  const categories = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .where("categories.id = :id", { id: req.params.id })
    .getOne();

  res.status(201).json(categories);
});

router.get('/:id/products', async (req: Request, res: Response) => {
  const categories = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .where("categories.id = :id", { id: req.params.id })
    .leftJoinAndSelect("categories.products", "products")
    .getOne();

  res.status(201).json(categories);
});

router.put('/:id', async (req: Request, res: Response) => {
  const categories = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .where("categories.id = :id", { id: req.params.id })
    .getOne();

  if (!categories) return res.status(400).send('Categories not found');

  const { description } = req.body;

  await AppDataSource.manager.update(
    Categories,
    { id: categories.id },
    {
      description
    }
  );

  res.status(201).json(categories);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const categories = await AppDataSource
    .getRepository(Categories)
    .createQueryBuilder("categories")
    .where("categories.id = :id", { id: req.params.id })
    .getOne();

  if (!categories) return res.status(400).send('Categories not found');

  await AppDataSource.manager.delete(
    Categories,
    { id: categories.id }
  );

  res.send(categories);
});

export default router;

