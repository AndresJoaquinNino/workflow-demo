import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeType } from './entities/node-type.entity';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get('types')
  @HttpCode(HttpStatus.OK)
  async findAllNodeTypes(): Promise<NodeType[]> {
    return this.nodeService.findAllNodeTypes();
  }
}
