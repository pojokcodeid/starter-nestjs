import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { type UpdateCatDto, updateCatSchema } from './dto/update-cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * POST /cats
   */
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  /**
   * GET /cats?activeOnly=true&page=1
   */
  @Get()
  findAll(
    @Query('activeOnly', new DefaultValuePipe(false)) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0)) page: number,
  ) {
    return this.catsService.findAll(activeOnly, page);
  }

  /**
   * GET /cats/:id
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
   */
  @Get('uuid/:uuid')
  findByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.catsService.findByUuid(uuid);
  }

  /**
   * PUT /cats/:id
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
