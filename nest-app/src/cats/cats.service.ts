import { Injectable } from '@nestjs/common';
import type { ICat } from './interface/cat.interface';

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
