import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from './store';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToMany(() => Store, (store) => store.seller)
  store: Store;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: false })
  documentNumber: string;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean;
}
