import "reflect-metadata"
import { DataSource } from 'typeorm';
import path from "path";

const entities = path.join(__dirname, '../entities/*.ts');

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [entities],
    subscribers: [],
    migrations: [],
});
