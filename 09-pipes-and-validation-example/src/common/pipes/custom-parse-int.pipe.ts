import { BadRequestException, PipeTransform } from '@nestjs/common';

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
