import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type AnyConstructor = new (...args: unknown[]) => unknown;

@Injectable()
export class ClassValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype as AnyConstructor)) {
      return value;
    }

    const object = plainToInstance(metatype, value) as object;
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map((err) =>
        Object.values(err.constraints || {}).join(', '),
      );
      throw new BadRequestException({
        message: 'Validation failed (class-validator manual)',
        errors: messages,
      });
    }

    return value;
  }

  private toValidate(metatype: AnyConstructor): boolean {
    const types: AnyConstructor[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
