import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Group } from '../entities/group';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const groupSchema = Joi.object({
  description: Joi.string().optional()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = groupSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { description } = req.body;

  const group = new Group();
  group.description = description;

  await AppDataSource.manager.save(group);

  res.status(201).json(group);
});

router.get('/', async (req: Request, res: Response) => {
  const groups = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .getMany();

  res.send(groups);
});

router.get('/:id/products', async (req: Request, res: Response) => {
  const group = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where("group.id = :id", { id: req.params.id })
    .leftJoinAndSelect("group.products", "product")
    .getMany();

  res.status(201).json(group);
});

router.get('/:id', async (req: Request, res: Response) => {
  const group = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where("group.id = :id", { id: req.params.id })
    .getOne();

  res.status(201).json(group);
});

router.put('/:id', async (req: Request, res: Response) => {
  const group = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where("group.id = :id", { id: req.params.id })
    .getOne();

  if (!group) return res.status(400).send('Group not found');

  const { description } = req.body;

  await AppDataSource.manager.update(
    Group,
    { id: group.id },
    {
      description
    }
  );

  res.status(201).json(group);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const group = await AppDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where("group.id = :id", { id: req.params.id })
    .getOne();

  if (!group) return res.status(400).send('Group not found');

  await AppDataSource.manager.delete(
    Group,
    { id: group.id }
  );

  res.send(group);
});

export default router;

