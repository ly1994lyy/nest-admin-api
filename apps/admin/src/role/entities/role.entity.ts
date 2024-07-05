import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'role_permission_relation' })
  permissions: Permission[];

  @ManyToMany(() => Menu)
  @JoinTable({ name: 'role_menu_relation' })
  menus: Menu[];
}
