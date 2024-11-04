import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Product } from '../entities/product';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const productSchema = Joi.object({
  description: Joi.string().optional(),
  details: Joi.string().optional(),
  price: Joi.number().required(),
  previousPrice: Joi.number().optional(),
  isActive: Joi.boolean().optional()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { description, details, price, previousPrice, isActive } = req.body;

  const product = new Product();
  product.description = description;
  product.details = details;
  product.price = price;
  product.previousPrice = previousPrice;
  product.isActive = isActive;

  await AppDataSource.manager.save(product);

  res.status(201).json(product);
});

router.get('/', async (req: Request, res: Response) => {
  const products = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .getMany();

  res.send(products);
});

router.get('/active', async (req: Request, res: Response) => {
  const products = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.isActive = :isActive", { isActive: true })
    .getMany();

  res.send(products);
});

router.get('/:id', async (req: Request, res: Response) => {
  const product = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id = :id", { id: req.params.id })
    .getOne();

  res.status(201).json(product);
});

router.get('/:id/complements', async (req: Request, res: Response) => {
  const product = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id = :id", { id: req.params.id })
    .leftJoinAndSelect("product.complements", "complements")
    .getMany();

  res.status(201).json(product);
});

router.put('/:id', async (req: Request, res: Response) => {
  const product = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id = :id", { id: req.params.id })
    .getOne();

  if (!product) return res.status(400).send('Product not found');

  const { description, details, price, previousPrice, isActive } = req.body;

  await AppDataSource.manager.update(
    Product,
    { id: product.id },
    {
      description,
      details,
      price,
      previousPrice,
      isActive
    }
  );

  res.status(201).json(product);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const product = await AppDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id = :id", { id: req.params.id })
    .getOne();

  if (!product) return res.status(400).send('Product not found');

  await AppDataSource.manager.delete(
    Product,
    { id: product.id }
  );

  res.send(product);
});

export default router;

