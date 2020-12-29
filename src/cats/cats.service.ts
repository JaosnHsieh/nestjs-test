import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  create(cat: Cat) {
    this.cats.push(cat);
    return cat;
  }
  findAll(): Cat[] {
    return this.cats;
  }
  findOne(id: number): Cat {
    if (this.cats[id]) {
      return this.cats[id];
    }
    return {
      age: 1,
      breed: '123',
      name: 'hh',
    };
  }
}
