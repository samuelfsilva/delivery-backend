import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Sale } from '../entities/sale';
import { User } from '../entities/user';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const saleSchema = Joi.object({
  isActive: Joi.boolean().required(),
  orderDate: Joi.date().required(),
  expectedDeliveryDate: Joi.date().required(),
  actualDeliveryDate: Joi.date(),
  user: Joi.object({
    id: Joi.string().required()
  }).required()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = saleSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { isActive, orderDate, expectedDeliveryDate, actualDeliveryDate, user } = req.body;

  const userExists = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: user.id })
    .getOne();

  if (!userExists) return res.status(400).send('User not found');

  const sale = new Sale();
  sale.isActive = isActive;
  sale.orderDate = orderDate;
  sale.expectedDeliveryDate = expectedDeliveryDate;
  sale.actualDeliveryDate = actualDeliveryDate;
  sale.user = userExists;

  await AppDataSource.manager.save(sale);

  res.status(201).json(sale);
});

router.get('/', async (req: Request, res: Response) => {
  const sales = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .leftJoinAndSelect("sale.user", "user")
    .getMany();
  
  res.send(sales);
});

router.get('/active', async (req: Request, res: Response) => {
  const sales = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.isActive = :isActive", { isActive: 1 })
    .getMany();
  
  res.send(sales);
});

router.get('/:id', async (req: Request, res: Response) => {
  const sale = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: req.params.id })
    .getOne();
  
  res.status(201).json(sale);
});

router.get('/:id/items', async (req: Request, res: Response) => {
  const sale = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: req.params.id })
    .leftJoinAndSelect("sale.saleItems", "saleItems")
    .leftJoinAndSelect("saleItems.product", "product")
    .getOne();
  
  res.status(201).json(sale);
});

router.get('/:id/items', async (req: Request, res: Response) => {
  const sale = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: req.params.id })
    .leftJoinAndSelect("sale.saleItems", "saleItems")
    .leftJoinAndSelect("saleItems.product", "product")
    .getOne();
  
  res.status(201).json(sale);
});

router.get('/orderPeriod/:startDate/:endDate', async (req: Request, res: Response) => {
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);
  
  const sales = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.orderDate >= :startDate AND sale.orderDate <= :endDate", { startDate, endDate })
    .getMany();
  
  res.send(sales);
});

router.get('/deliveryPeriod/:startDate/:endDate', async (req: Request, res: Response) => {
  const { startDate: startDateString, endDate: endDateString } = req.params;
  let startDate: Date, endDate: Date;
  try {
    startDate = new Date(startDateString);
    endDate = new Date(endDateString);
  } catch {
    return res.status(400).send('Invalid date format. Please use the format: YYYY-MM-DD');
  }

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).send('Invalid date format. Please use the format: YYYY-MM-DD');
  }

  if (startDate > endDate) {
    return res.status(400).send('Start date cannot be greater than end date');
  }
  
  const sales = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.actualDeliveryDate >= :startDate AND sale.actualDeliveryDate <= :endDate", { startDate, endDate })
    .getMany();
  
  res.send(sales);
});

router.get('/orderDate/:orderDate', async (req: Request, res: Response) => {
  let orderDate: Date;

  try {
    orderDate = new Date(req.params.orderDate);
  } catch {
    return res.status(400).send('Invalid order date');
  }
  
  if (isNaN(orderDate.getTime())) return res.status(400).send('Invalid order date');
  
  const sales = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.orderDate = :orderDate", { orderDate })
    .getMany();
  
  res.send(sales);
});

router.put('/:id', async (req: Request, res: Response) => {
  const sale = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: req.params.id })
    .getOne();
  
  if (!sale) return res.status(400).send('Sale not found');
  
  await AppDataSource
    .manager
    .update(
      Sale, 
      { id: sale.id }, 
      { 
        isActive: req.body.isActive,
        orderDate: req.body.orderDate,
        expectedDeliveryDate: req.body.expectedDeliveryDate,
        actualDeliveryDate: req.body.actualDeliveryDate,
        user: req.body.user
      })

  res.status(201).json(sale);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const sale = await AppDataSource
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .where("sale.id = :id", { id: req.params.id })
    .getOne();
  
  if (!sale) return res.status(400).send('Sale not found');
  
  await AppDataSource
    .manager
    .delete(
      Sale, 
      { id: sale.id })
  
  res.send(sale);
});

export default router;


