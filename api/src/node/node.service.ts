import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NodeType } from './entities/node-type.entity';
import { Node } from './entities/node.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(NodeType)
    private nodeTypeRepository: Repository<NodeType>,
    @InjectRepository(Node)
    private nodeRepository: Repository<Node>,
  ) {}

  findAllNodeTypes(): Promise<NodeType[]> {
    return this.nodeTypeRepository.find({
      relations: ['nodeShape'],
    });
  }

  createMultipleNodes(nodes: Node[]): Promise<Node[]> {
    return this.nodeRepository.save(nodes);
  }

  async softDeleteNodesByWorkflowId(workflowId: number): Promise<UpdateResult> {
    return this.nodeRepository.softDelete({ workflow: { id: workflowId } });
  }
}
