import {
  IsString,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

/**
 * DTO dengan class-validator decorators
 * Sumber kebenaran tunggal untuk validasi Post body
 */
export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;
}
