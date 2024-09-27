import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from './sale';
import { Product } from './product';

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sale, (sale) => sale.items)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.saleItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'varchar', nullable: true })
  details: string | null;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'numeric', nullable: true })
  quantity: number | null;
}
