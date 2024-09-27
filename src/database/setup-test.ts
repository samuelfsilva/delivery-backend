import "reflect-metadata"
import { afterAll, beforeAll } from 'vitest';
import { AppDataSource } from "./data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

