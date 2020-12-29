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
  UseInterceptors,
} from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { JoiValidationPipe, createCateSchema } from './validation.pipe';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/:id')
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
  @UseInterceptors(LoggingInterceptor)
  async findAll() {
    console.log('$ findAll');
    if (Math.random() < 0.9) {
      await wait(6000);
    }
    // return new HttpException({ abc: '123' }, HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }
}

function wait(ms = 1000) {
  return new Promise((ok) => {
    setTimeout(ok, ms);
  });
}
