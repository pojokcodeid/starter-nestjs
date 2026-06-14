import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Custom Pipe: CustomParseIntPipe (Transformation Pipe)
 * Mengubah string → integer, melempar error jika gagal
 * Referensi: https://docs.nestjs.com/pipes#transformation-use-case
 *
 * Ini adalah versi custom sederhana dari built-in ParseIntPipe
 */
@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `"${value}" bukan angka integer yang valid`,
      );
    }
    if (val < 1) {
      throw new BadRequestException('ID harus berupa angka positif (>= 1)');
    }
    return val;
  }
}
