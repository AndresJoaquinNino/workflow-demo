import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Edge } from './entities/edge.entity';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(Edge)
    private edgeRepository: Repository<Edge>,
  ) {}

  createMultipleEdges(edges: Edge[]): Promise<Edge[]> {
    return this.edgeRepository.save(edges);
  }

  async softDeleteEdgesByWorkflowId(workflowId: number): Promise<UpdateResult> {
    return this.edgeRepository.softDelete({ workflow: { id: workflowId } });
  }
}
