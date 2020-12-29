import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema, object, string, number } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { convert: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}

export const createCateSchema = object({
  name: string().min(3),
  age: number().min(5),
  breed: string().min(1),
});
