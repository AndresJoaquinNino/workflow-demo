import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NodeType } from './entities/node-type.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(NodeType)
    private nodeTypeRepository: Repository<NodeType>,
  ) {}

  findAllNodeTypes(): Promise<NodeType[]> {
    return this.nodeTypeRepository.find({
      relations: ['nodeShape'],
    });
  }
}
