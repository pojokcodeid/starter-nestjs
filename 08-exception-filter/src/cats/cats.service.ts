import { BadRequestException, Injectable } from '@nestjs/common';
import type { ICat } from './interface/cat.interface';
// import { UserException } from 'custom-exception/user.exception';

@Injectable()
export class CatsService {
  private cats: ICat[] = [
    {
      id: 1,
      name: 'Kitty',
      age: 2,
      breed: 'Persian',
    },
  ];

  findAll(): ICat[] {
    // contoh error yang terjadi dengan ditangani default exception handler
    // throw new Error('Test error');
    // untuk memberikan return message yang sesuai keinginan kita bisa menggunakan HTTPException

    // contoh custom user exception
    // throw new UserException();
    const nilai = 0;
    if (nilai === 0) {
      //throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'Input tidak ditemukan',
      });
    }
    return this.cats;
  }

  createCat(cat: ICat): ICat {
    this.cats.push(cat);
    return cat;
  }

  findOneCat(id: number): ICat | undefined {
    const cat = this.cats.find((cat) => cat.id == id);
    return cat;
  }

  updateCat(id: number, cat: ICat): ICat | string {
    const catIndex = this.cats.findIndex((cat) => cat.id == id);
    if (catIndex == -1) {
      return 'Cat not found';
    }
    this.cats[catIndex] = { ...this.cats[catIndex], ...cat };
    return this.cats[catIndex];
  }

  removeCat(id: number): string {
    const catIndex = this.cats.findIndex((cat) => cat.id == id);
    if (catIndex == -1) {
      return 'Cat not found';
    }
    this.cats.splice(catIndex, 1);
    return `Cat with id ${id} has been removed`;
  }
}
