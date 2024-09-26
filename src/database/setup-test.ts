import "reflect-metadata"
import path from 'path';
import { DataSource } from 'typeorm';
import { afterAll, beforeAll } from 'vitest';

let dataSource: DataSource;
const entities = path.join(__dirname, '../entities/*.ts');

beforeAll(async () => {
  dataSource = new DataSource({
    type: "sqlite",
    database: "database-test.sqlite",
    synchronize: true,
    logging: true,
    entities: [entities],
    subscribers: [],
    migrations: [],
  });
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

export { dataSource };
