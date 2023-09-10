import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Workflow } from '../../workflow/entities/workflow.entity';

@Entity({ name: 'edge' })
export class Edge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  source: string;

  @Column({ name: 'source_handle' })
  sourceHandle: string;

  @Column()
  target: string;

  @Column({ name: 'target_handle' })
  targetHandle: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.edges)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date;
}
