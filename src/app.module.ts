import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [CatsModule, DogsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
