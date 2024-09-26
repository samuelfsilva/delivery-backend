import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Categories } from './categories';
import { Group } from './group';
import { Store } from './store';
import { Complement } from './complement';
import { SaleItem } from './sale_items';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => Group, (group) => group.products)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToMany(() => Complement, (complement) => complement.products)
  @JoinTable({
    name: 'product_complements',
    joinColumns: [{ name: 'product_id' }],
    inverseJoinColumns: [{ name: 'complement_id' }]
  })
  complements: Complement[];

  @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
  saleItems: SaleItem[];

  @Column()
  description: string;

  @Column()
  details: string;

  @Column()
  price: number;

  @Column()
  previousPrice: number;

  @Column()
  isActive: boolean;
}