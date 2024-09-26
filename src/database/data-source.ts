import "reflect-metadata"
import { DataSource } from 'typeorm';
import { Address } from '../models/addresses';
import { Categories } from '../models/categories';
import { Complement } from '../models/complement';
import { Group } from '../models/group';
import { Product } from '../models/product';
import { Sale } from '../models/sale';
import { SaleItem } from '../models/sale_items';
import { Seller } from '../models/seller';
import { Store } from '../models/store';
import { User } from '../models/user';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Address, Categories, Complement, Group, Product, Sale, SaleItem, Seller, Store, User],
    subscribers: [],
    migrations: [],
});
