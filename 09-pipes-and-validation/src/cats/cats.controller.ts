import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { updateCatSchema } from './dto/update-cat.schema';
import type { UpdateCatDto } from './dto/update-cat.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * POST /cats
   * Validasi body menggunakan class-validator (via Global ValidationPipe)
   * Contoh body valid:
   *   { "name": "Whiskers", "age": 2, "breed": "Tabby" }
   * Contoh body invalid:
   *   { "name": "W", "age": -1 }  → 400 Bad Request
   */
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  /**
   * GET /cats?activeOnly=true&page=1
   * DefaultValuePipe: memberikan nilai default jika query param tidak ada
   * ParseBoolPipe & ParseIntPipe: transformasi tipe data
   */
  @Get()
  findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAll(activeOnly, page);
  }

  /**
   * GET /cats/:id
   * ParseIntPipe: memastikan :id berupa integer valid
   * Jika bukan angka → 400: "Validation failed (numeric string is expected)"
   *
   * Contoh custom errorHttpStatusCode:
   */
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  /**
   * GET /cats/uuid/:uuid
   * ParseUUIDPipe: memvalidasi format UUID
   * Jika bukan UUID valid → 400 Bad Request
   */
  @Get('uuid/:uuid')
  findByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.catsService.findByUuid(uuid);
  }

  /**
   * PUT /cats/:id
   * Kombinasi: ParseIntPipe pada param + ZodValidationPipe pada body
   * ZodValidationPipe dipakai di level method dengan @UsePipes
   * Contoh body:
   *   { "name": "Tom Jr", "age": 4 }
   */
  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateCatSchema))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }
}
