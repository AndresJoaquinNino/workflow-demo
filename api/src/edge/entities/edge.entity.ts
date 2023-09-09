import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
