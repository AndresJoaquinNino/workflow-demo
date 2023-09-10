import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
