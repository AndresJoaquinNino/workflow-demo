import { IsNotEmpty, Length, Validate } from 'class-validator';
import { UniqueNameValidator } from '../validators/unique-name.validator';

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
}
