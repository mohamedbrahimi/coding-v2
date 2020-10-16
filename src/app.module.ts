import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodingModule } from './conding/codingModule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
     CodingModule,
     MongooseModule.forRoot('mongodb://localhost/coding-test',{
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
     })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
