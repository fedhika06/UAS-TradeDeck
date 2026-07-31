import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  // Jumlah listing yang ditampilkan di landing page.
  @Column({ type: 'int', default: 0 })
  count: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
