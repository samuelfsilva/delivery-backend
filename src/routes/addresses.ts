import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Address } from '../entities/addresses';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const addressesSchema = Joi.object({
  postalCode: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.number().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  complement: Joi.string().optional(),
  reference: Joi.string().optional()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = addressesSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { postalCode, street, number, city, state, complement, reference } = req.body;

  const address = new Address();
  address.postalCode = postalCode;
  address.street = street;
  address.number = number;
  address.city = city;
  address.state = state;
  address.complement = complement;
  address.reference = reference;

  await AppDataSource.manager.save(address);

  res.status(201).json(address);
});

router.get('/', async (req: Request, res: Response) => {
  const addresses = await AppDataSource
    .getRepository(Address)
    .createQueryBuilder("address")
    .getMany();

  res.send(addresses);
});

router.get('/:id', async (req: Request, res: Response) => {
  const address = await AppDataSource
    .getRepository(Address)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: req.params.id })
    .getOne();

  res.status(201).json(address);
});

router.put('/:id', async (req: Request, res: Response) => {
  const address = await AppDataSource
    .getRepository(Address)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: req.params.id })
    .getOne();

  if (!address) return res.status(400).send('Address not found');

  const { postalCode, street, number, city, state, complement, reference } = req.body;

  await AppDataSource.manager.update(
    Address,
    { id: address.id },
    {
      postalCode,
      street,
      number,
      city,
      state,
      complement,
      reference
    }
  );

  res.status(201).json(address);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const address = await AppDataSource
    .getRepository(Address)
    .createQueryBuilder("address")
    .where("address.id = :id", { id: req.params.id })
    .getOne();

  if (!address) return res.status(400).send('Address not found');

  await AppDataSource.manager.delete(
    Address,
    { id: address.id }
  );

  res.send(address);
});

export default router;

