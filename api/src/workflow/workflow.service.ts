import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
  ) {}

  create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const workflow = this.workflowRepository.create(createWorkflowDto);
    return this.workflowRepository.save(workflow);
  }

  async paginate(page: number, limit: number): Promise<[Workflow[], number]> {
    return this.workflowRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findAll() {
    return this.workflowRepository.find();
  }

  findOne(id: number): Promise<Workflow> {
    return this.workflowRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return `This action updates a #${id} workflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflow`;
  }
}
