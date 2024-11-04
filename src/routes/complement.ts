import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Complement } from '../entities/complement';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const complementSchema = Joi.object({
  description: Joi.string().required(),
  weight: Joi.number().required(),
  isActive: Joi.boolean().required()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = complementSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { description, weight, isActive } = req.body;

  const complement = new Complement();
  complement.description = description;
  complement.weight = weight;
  complement.isActive = isActive;

  await AppDataSource.manager.save(complement);

  res.status(201).json(complement);
});

router.get('/', async (req: Request, res: Response) => {
  const complements = await AppDataSource
    .getRepository(Complement)
    .createQueryBuilder("complement")
    .getMany();

  res.send(complements);
});

router.get('/:id', async (req: Request, res: Response) => {
  const complement = await AppDataSource
    .getRepository(Complement)
    .createQueryBuilder("complement")
    .where("complement.id = :id", { id: req.params.id })
    .getOne();

  res.status(201).json(complement);
});

router.put('/:id', async (req: Request, res: Response) => {
  const complement = await AppDataSource
    .getRepository(Complement)
    .createQueryBuilder("complement")
    .where("complement.id = :id", { id: req.params.id })
    .getOne();

  if (!complement) return res.status(400).send('Complement not found');

  const { description, weight, isActive } = req.body;

  await AppDataSource.manager.update(
    Complement,
    { id: complement.id },
    {
      description,
      weight,
      isActive
    }
  );

  res.status(201).json(complement);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const complement = await AppDataSource
    .getRepository(Complement)
    .createQueryBuilder("complement")
    .where("complement.id = :id", { id: req.params.id })
    .getOne();

  if (!complement) return res.status(400).send('Complement not found');

  await AppDataSource.manager.delete(
    Complement,
    { id: complement.id }
  );

  res.send(complement);
});

export default router;

