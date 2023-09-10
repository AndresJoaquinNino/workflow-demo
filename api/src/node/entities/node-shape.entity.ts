import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NodeType } from './node-type.entity';

@Entity({ name: 'node_shape' })
export class NodeShape {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => NodeType, (nodeType) => nodeType.nodeShape)
  nodeTypes: NodeType[];
}
