import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NodeType } from './node-type.entity';

@Entity({ name: 'node' })
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => NodeType, (nodeType) => nodeType.nodes)
  @JoinColumn({ name: 'node_type_id' })
  nodeTypes: NodeType;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
