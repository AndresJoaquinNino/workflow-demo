import {
  IsNotEmpty,
  ArrayNotEmpty,
  Length,
  Validate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UniqueNameValidator } from '../validators/unique-name.validator';
import { Node } from 'src/node/entities/node.entity';
import { Edge } from 'src/edge/entities/edge.entity';

export class CreateWorkflowDto {
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 255)
  @Validate(UniqueNameValidator, ['name'], {
    message: 'The name is already in use',
  })
  name: string;

  @IsNotEmpty({ message: 'description is required' })
  @Length(3, 255)
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Node)
  nodes: Node[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Edge)
  edges: Edge[];
}
