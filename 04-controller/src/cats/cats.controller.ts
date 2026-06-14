import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface Cat {
  id: number;
  nama: string;
  umur: number;
}

@Controller('cats')
export class CatsController {
  private cats: Cat[] = [{ id: 1, nama: 'Black', umur: 2 }];
  @Get()
  findAll(@Res() res: Response, @Req() req: Request): any {
    // const cat = ['Pussy', 'Black', 'White'];
    this.cats.push({ id: 2, nama: 'Pussy', umur: 4 });
    this.cats.push({ id: 3, nama: 'Orange', umur: 6 });
    // return cat;

    console.log(req.body); // ini tidak dianjurkan menggunakan req dari express gunakanlah @Body()
    return res.send(this.cats);
    // return cat; // ini akan hang karena sudah di definisikan @Res()
  }

  @Post()
  // create(): string {
  //   return 'This action adds a new cat';
  // }
  create(@Body() body: Cat): any {
    // console.log(body);
    this.cats.push(body);
    return body;
  }

  // @Get(':id')
  // findOne(): string {
  //   return 'This action returns a #id cat';
  // }
  // jangan gunakan refesifik param dari Express gunakanlah @Param
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number): Cat | undefined {
    const cat = this.cats.find((cat) => cat.id == id);
    return cat;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Cat): Cat | undefined {
    const cat = this.cats.find((cat) => cat.id == id);
    if (cat) {
      cat.nama = body.nama;
      cat.umur = body.umur;
    }
    return cat;
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    const cat = this.cats.find((cat) => cat.id == id);
    if (cat) {
      this.cats = this.cats.filter((cat) => cat.id != id);
      return `This action removes a #${id} cat`;
    }
    return `Cat with id ${id} not found`;
  }
}
