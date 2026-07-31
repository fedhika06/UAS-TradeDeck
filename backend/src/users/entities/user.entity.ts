import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rfq } from '../../rfq/entities/rfq.entity';

export enum UserRole {
  BUYER = 'buyer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  email: string;

  // Password sudah di-hash (bcrypt), tidak pernah dikirim ke response.
  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  company: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @OneToMany(() => Rfq, (rfq) => rfq.user)
  rfqs: Rfq[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
