import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'workflow' })
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
