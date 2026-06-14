import { Injectable } from '@nestjs/common';
import { ICat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private cats: ICat[] = [
    {
      id: 1,
      name: 'Persia',
      age: 2,
      breed: 'Domestic',
    },
  ];

  getAllCats(): ICat[] {
    return this.cats;
  }

  createCat(cat: ICat): ICat {
    this.cats.push(cat);
    return cat;
  }

  findOneCat(id: number): ICat {
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
    return 'Cat removed successfully';
  }
}
