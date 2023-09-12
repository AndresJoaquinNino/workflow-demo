import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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
      relations: ['nodes.nodeType.nodeShape', 'edges'],
    });
  }

  async update(
    id: number,
    updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      throw new NotFoundException([`Workflow with ID ${id} not found`]);
    }

    return this.workflowRepository.save({
      ...workflow,
      name: updateWorkflowDto.name,
      description: updateWorkflowDto.description,
    });
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return this.workflowRepository.softDelete(id);
  }
}
