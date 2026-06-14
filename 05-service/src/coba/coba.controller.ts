import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CobaService } from './coba.service';
import { CreateCobaDto } from './dto/create-coba.dto';
import { UpdateCobaDto } from './dto/update-coba.dto';
import { CatsService } from 'src/cats/cats.service';
import { ICat } from 'src/cats/interfaces/cat.interface';

@Controller('coba')
export class CobaController {
  constructor(
    private readonly cobaService: CobaService,
    private readonly catService: CatsService,
  ) {}

  @Post()
  create(@Body() createCobaDto: CreateCobaDto) {
    return this.cobaService.create(createCobaDto);
  }

  @Get()
  findAll() {
    return this.cobaService.findAll();
  }

  @Get('cat')
  findAllCat(): ICat[] {
    return this.catService.getAllCats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cobaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCobaDto: UpdateCobaDto) {
    return this.cobaService.update(+id, updateCobaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cobaService.remove(+id);
  }
}
