import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { SaleItem } from '../entities/sale_items';
import { Sale } from '../entities/sale';
import { Product } from '../entities/product';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const saleItemSchema = Joi.object({
  saleId: Joi.string().required(),
  productId: Joi.string().required(),
  details: Joi.string().optional(),
  price: Joi.number().required(),
  quantity: Joi.number().optional()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = saleItemSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { saleId, productId, details, price, quantity } = req.body;

  const sale = await AppDataSource.getRepository(Sale).findOne(saleId);
  if (!sale) return res.status(400).send('Sale not found');

  const product = await AppDataSource.getRepository(Product).findOne(productId);
  if (!product) return res.status(400).send('Product not found');

  const saleItem = new SaleItem();
  saleItem.sale = sale;
  saleItem.product = product;
  saleItem.details = details;
  saleItem.price = price;
  saleItem.quantity = quantity;

  await AppDataSource.manager.save(saleItem);

  res.status(201).json(saleItem);
});

router.get('/', async (req: Request, res: Response) => {
  const saleItems = await AppDataSource
    .getRepository(SaleItem)
    .createQueryBuilder("saleItem")
    .leftJoinAndSelect("saleItem.sale", "sale")
    .leftJoinAndSelect("saleItem.product", "product")
    .getMany();

  res.send(saleItems);
});

router.get('/:id', async (req: Request, res: Response) => {
  const saleItem = await AppDataSource
    .getRepository(SaleItem)
    .createQueryBuilder("saleItem")
    .where("saleItem.id = :id", { id: req.params.id })
    .getOne();

  res.status(201).json(saleItem);
});

router.put('/:id', async (req: Request, res: Response) => {
  const saleItem = await AppDataSource
    .getRepository(SaleItem)
    .createQueryBuilder("saleItem")
    .where("saleItem.id = :id", { id: req.params.id })
    .getOne();

  if (!saleItem) return res.status(400).send('Sale item not found');

  const { details, price, quantity } = req.body;

  await AppDataSource.manager.update(
    SaleItem,
    { id: saleItem.id },
    {
      details,
      price,
      quantity
    }
  );

  res.status(201).json(saleItem);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const saleItem = await AppDataSource
    .getRepository(SaleItem)
    .createQueryBuilder("saleItem")
    .where("saleItem.id = :id", { id: req.params.id })
    .getOne();

  if (!saleItem) return res.status(400).send('Sale item not found');

  await AppDataSource.manager.delete(
    SaleItem,
    { id: saleItem.id }
  );

  res.send(saleItem);
});

export default router;

