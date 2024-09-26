import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { SaleItem } from './sale_items';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
  items: SaleItem[];

  @Column()
  orderDate: Date;

  @Column({ type: 'datetime', nullable: true })
  expectedDeliveryDate: Date | null;

  @Column({ type: 'datetime', nullable: true })
  actualDeliveryDate: Date | null;

  @Column()
  isActive: boolean;
}
