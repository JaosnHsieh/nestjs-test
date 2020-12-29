import { Controller, Get, Post, Body } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CatsService } from '../cats/cats.service';
import { CreateDogDto } from './create-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(
    private dogsService: DogsService,
    private catsService: CatsService,
  ) {}
  @Post()
  createDog(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.createDog(createDogDto);
  }
  @Get()
  getDogs() {
    return {
      dogs: this.dogsService.getDogs(),
      cats: this.catsService.findAll(),
    };
  }
}
