import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsInt, IsNotEmpty } from 'class-validator';
import { NodeType } from './node-type.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';

@Entity({ name: 'node' })
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'reference is required' })
  reference: string;

  @Column()
  @IsNotEmpty({ message: 'text is required' })
  text: string;

  @Column({ name: 'position_x' })
  @IsInt()
  @IsNotEmpty({ message: 'positionX is required' })
  positionX: number;

  @Column({ name: 'position_y' })
  @IsInt()
  @IsNotEmpty({ message: 'positionY is required' })
  positionY: number;

  @ManyToOne(() => NodeType, (nodeType) => nodeType.nodes)
  @JoinColumn({ name: 'node_type_id' })
  nodeType: NodeType;

  @ManyToOne(() => Workflow, (workflow) => workflow.nodes)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
