import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './entities/node.entity';
import { NodeShape } from './entities/node-shape.entity';
import { NodeType } from './entities/node-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node, NodeType, NodeShape])],
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
