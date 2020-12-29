import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';
@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];
  createDog(dog: Dog) {
    this.dogs.push(dog);
    return dog;
  }
  getDogs(): Dog[] {
    return this.dogs;
  }
}
