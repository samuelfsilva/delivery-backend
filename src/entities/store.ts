import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Seller } from './seller'; 
import { Product } from './product';
import { Address } from './addresses';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Seller, (seller) => seller.store)
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @ManyToMany(() => Address, (address) => address.stores)
  @JoinTable({
    name: 'store_addresses',
    joinColumns: [{ name: 'store_id' }],
    inverseJoinColumns: [{ name: 'address_id' }]
  })
  addresses: Address[];

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: false })
  storeName: string;

  @Column({ type: 'varchar', nullable: false })
  storeDescription: string;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean;
}
