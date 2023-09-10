import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Node } from '../../node/entities/node.entity';
import { Edge } from 'src/edge/entities/edge.entity';

@Entity({ name: 'workflow' })
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Node, (node) => node.workflow)
  nodes: Node[];

  @OneToMany(() => Edge, (edge) => edge.workflow)
  edges: Edge[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date;
}
