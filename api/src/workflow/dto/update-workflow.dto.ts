import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowDto } from './create-workflow.dto';
import { Node } from 'src/node/entities/node.entity';
import { Edge } from 'src/edge/entities/edge.entity';

export class UpdateWorkflowDto extends PartialType(CreateWorkflowDto) {
  name?: string;
  description?: string;
  nodes?: Node[];
  edges?: Edge[];
}
