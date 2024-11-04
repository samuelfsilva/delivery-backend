import "reflect-metadata"
import { DataSource } from 'typeorm';

import { Address } from "../entities/addresses";
import { Categories } from "../entities/categories";
import { Complement } from "../entities/complement";
import { Group } from "../entities/group";
import { Product } from "../entities/product";
import { SaleItem } from "../entities/sale_items";
import { Sale } from "../entities/sale";
import { Seller } from "../entities/seller";
import { Store } from "../entities/store";
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.NODE_ENV?.trim().toUpperCase() === 'TEST' ? 
        "database-test.sqlite" : "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Address, Categories, Complement, Group, Product, SaleItem, Sale, Seller, Store, User],
    subscribers: [],
    migrations: [],
    migrationsTableName: "migration_table_name"
});
