import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NodeType } from './node-type.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';

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

  @ManyToOne(() => Workflow, (workflow) => workflow.nodes)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
