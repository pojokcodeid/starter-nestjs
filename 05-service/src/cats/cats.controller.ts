import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import type { ICat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): ICat[] {
    return this.catsService.getAllCats();
  }

  @Post()
  create(@Body() cat: ICat): ICat {
    const newCat = this.catsService.createCat(cat);
    return newCat;
  }

  @Get(':id')
  findOne(@Param('id') id: number): ICat | string {
    const cat = this.catsService.findOneCat(id);
    if (!cat) {
      return 'Cat not found';
    }
    return cat;
  }

  @Put(':id')
  update(@Body() cat: ICat, @Param('id') id: number): ICat | string {
    const catEdit = this.catsService.updateCat(id, cat);
    return catEdit;
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    const result = this.catsService.removeCat(id);
    return result;
  }
}
