import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { CatsModule } from '../cats/cats.module';

@Module({
  providers: [DogsService],
  controllers: [DogsController],
  imports: [CatsModule],
})
export class DogsModule {}
