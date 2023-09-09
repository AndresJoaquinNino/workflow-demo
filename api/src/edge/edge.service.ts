import { Injectable } from '@nestjs/common';
import { CreateEdgeDto } from './dto/create-edge.dto';

@Injectable()
export class EdgeService {
  create(createEdgeDto: CreateEdgeDto) {
    return 'This action adds a new edge';
  }
}
