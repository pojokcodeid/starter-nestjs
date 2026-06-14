import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.schema';

export interface Cat {
  id: number;
  uuid: string;
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 1,
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Tom',
      age: 3,
      breed: 'Persian',
    },
    {
      id: 2,
      uuid: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Kitty',
      age: 1,
      breed: 'Siamese',
    },
    {
      id: 3,
      uuid: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Luna',
      age: 5,
      breed: 'Maine Coon',
    },
  ];
  private nextId = 4;

  findAll(activeOnly: boolean, page: number): Cat[] {
    console.log('activeOnly', activeOnly);
    const pageSize = 2;
    const start = page * pageSize;
    return this.cats.slice(start, start + pageSize);
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((c) => c.id === id);
    if (!cat) throw new NotFoundException(`Cat #${id} not found`);
    return cat;
  }

  findByUuid(uuid: string): Cat {
    const cat = this.cats.find((c) => c.uuid === uuid);
    if (!cat) throw new NotFoundException(`Cat with UUID ${uuid} not found`);
    return cat;
  }

  create(dto: CreateCatDto): Cat {
    const cat: Cat = {
      id: this.nextId++,
      uuid: `generated-uuid-${Date.now()}`,
      ...dto,
    };
    this.cats.push(cat);
    return cat;
  }

  update(id: number, dto: UpdateCatDto): Cat {
    const cat = this.findOne(id);
    Object.assign(cat, dto);
    return cat;
  }
}
