import "reflect-metadata"
import { afterAll, beforeAll } from 'vitest';
import { AppDataSource } from "./data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
  console.log('Database inicialized');
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('Database destroyed');
  }
});

