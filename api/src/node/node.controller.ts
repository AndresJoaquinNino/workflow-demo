import { Controller, Get } from '@nestjs/common';
import { NodeService } from './node.service';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get('types')
  findAllNodeTypes() {
    return this.nodeService.findAllNodeTypes();
  }
}
