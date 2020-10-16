import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books/booksController';
import { BooksService } from './books/books.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { Book, BookSchema, User, UserSchema } from './schemas';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema  },
      { name: User.name, schema: UserSchema }
      ])
  ],
  controllers: [BooksController, UsersController],
  providers: [BooksService, UsersService],
})
export class CodingModule {}
