import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import type { ICat } from './interface/cat.interface';
import { HttpExceptionFilter } from 'custom-exception/httpfilter.exception';

// GET /cats
@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll(): ICat[] {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() body: ICat): ICat {
    const cat = this.catsService.createCat(body);
    return cat;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number): ICat | string {
    throw new HttpException('Test error', 500);
    const cat = this.catsService.findOneCat(id);
    if (cat) {
      return cat;
    }
    return 'Cat not found';
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: ICat): ICat | string {
    const cat = this.catsService.updateCat(id, body);
    return cat;
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    const cat = this.catsService.removeCat(id);
    return cat;
  }
}
