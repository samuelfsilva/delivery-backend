import express, { Router, Request, Response } from 'express';
import Joi from 'joi';
import { User } from '../entities/user';
import { AppDataSource } from '../database/data-source';

const router: Router = express.Router();

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  birthdate: Joi.date().required(),
  password: Joi.string().required()
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName, email, birthdate, password } = req.body;
  
  const userExists = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .getOne();

  if (userExists) return res.status(400).send('Email already registered');

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.birthdate = birthdate;
  user.password = password;
  user.createdAt = new Date();
  user.updatedAt = new Date();

  await AppDataSource.manager.save(user);

  res.status(201).json(user);
});

router.get('/', async (req: Request, res: Response) => {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .getMany();
  
  res.send(users);
});

router.get('/active', async (req: Request, res: Response) => {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.isActive = :isActive", { isActive: 1 })
    .getMany();
  
  res.send(users);
});

router.get('/firstName/:firstName', async (req: Request, res: Response) => {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.firstName LIKE :firstName", { firstName: `%${req.params.firstName}%` })
    .getMany();
  
  res.send(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: req.params.id })
    .getOne();
  
  res.status(201).json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: req.params.id })
    .getOne();
  
  if (!user) return res.status(400).send('User not found');
  
  await AppDataSource
    .manager
    .update(
      User, 
      { id: user.id }, 
      { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthdate: req.body.birthdate,
        password: req.body.password,
        updatedAt: new Date()
      })

  res.status(201).json(user);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: req.params.id })
    .getOne();
  
  if (!user) return res.status(400).send('User not found');
  
  await AppDataSource
    .manager
    .delete(
      User, 
      { id: user.id })
  
  res.send(user);
});

export default router;