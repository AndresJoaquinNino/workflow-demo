import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Node } from './node.entity';
import { NodeShape } from './node-shape.entity';

@Entity({ name: 'node_type' })
export class NodeType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Node, (node) => node.nodeTypes)
  nodes: Node[];

  @ManyToOne(() => NodeShape, (nodeShape) => nodeShape.nodeTypes)
  @JoinColumn({ name: 'node_shape_id' })
  nodeShape: NodeShape;
}
