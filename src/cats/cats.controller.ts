import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
  Query,
  UsePipes,
} from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { JoiValidationPipe, createCateSchema } from './validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findOne(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
  @Post()
  //   @UseFilters(HttpExceptionFilter)
  @UsePipes(new JoiValidationPipe(createCateSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    // return new ForbiddenException();
    return this.catsService.create(createCatDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll() {
    console.log('$ findAll');
    throw new ForbiddenException();

    // return new HttpException({ abc: '123' }, HttpStatus.FORBIDDEN);
    // return this.catsService.findAll();
  }
}
