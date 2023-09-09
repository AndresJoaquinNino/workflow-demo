import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeService {
  findAllNodeTypes() {
    return `This action returns all node types`;
  }
}
