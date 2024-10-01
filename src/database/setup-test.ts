import "reflect-metadata"
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { AppDataSource } from "./data-source";

beforeAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  await AppDataSource.initialize();
  console.log('Database inicialized');
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

