import "reflect-metadata"
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { AppDataSource } from "./data-source";

beforeAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  await AppDataSource.initialize();
  console.log('Database inicialized');
  if (process.env.NODE_ENV?.trim().toUpperCase() === 'TEST') {
    console.log('Test environment');
  } else {
    console.log('Homologation environment');
  }
});

afterEach(() => {
  vi.restoreAllMocks();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('Database destroyed');
  }
});

