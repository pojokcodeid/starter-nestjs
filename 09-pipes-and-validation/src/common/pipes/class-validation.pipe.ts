import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Custom Pipe: ClassValidationPipe
 * Implementasi manual ValidationPipe menggunakan class-validator + class-transformer
 * Referensi: https://docs.nestjs.com/pipes#class-validator
 *
 * Catatan: Nest sudah menyediakan built-in ValidationPipe yang lebih lengkap.
 * Ini adalah contoh edukasi cara kerjanya di balik layar.
 */
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
