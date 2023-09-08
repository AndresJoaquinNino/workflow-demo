import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Workflow } from '../entities/workflow.entity';

@ValidatorConstraint({ name: 'uniqueName', async: true })
export class UniqueNameValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  async validate(name: string): Promise<boolean> {
    const queryBuilder: SelectQueryBuilder<Workflow> = this.workflowRepository
      .createQueryBuilder('workflow')
      .where('workflow.name = :name', { name });

    const count = await queryBuilder.getCount();

    console.log('count', count);

    return count === 0;
  }
}
