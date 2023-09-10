import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { UniqueNameValidator } from './validators/unique-name.validator';
import { NodeModule } from '../node/node.module';
import { EdgeModule } from 'src/edge/edge.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow]), NodeModule, EdgeModule],
  controllers: [WorkflowController],
  providers: [WorkflowService, UniqueNameValidator],
})
export class WorkflowModule {}
