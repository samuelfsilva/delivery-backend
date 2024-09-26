import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from './store';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToMany(() => Store, (store) => store.seller)
  store: Store;

  @Column()
  createdAt: Date;

  @Column()
  documentNumber: string;

  @Column()
  isActive: boolean;
}
