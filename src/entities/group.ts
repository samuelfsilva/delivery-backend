import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product';
import { Complement } from './complement';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Product, (product) => product.group)
  products: Product[];

  @OneToMany(() => Complement, (complement) => complement.groups)
  complements: Complement[];

  @Column()
  description: string;
}
