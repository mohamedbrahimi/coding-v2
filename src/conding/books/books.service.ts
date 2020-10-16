import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../schemas';

@Injectable()
export class BooksService {

  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  getBooks(): Promise<Book[]> {
    return this.bookModel.find({ archived: false }, 'title desc cover type').exec();
  }

  getSingleBook(id: string): Promise<Book> {
    return this.bookModel.findOne({_id: id, archived: false }, 'title desc cover type').exec();
  }

  addBook(book: any = {}): Promise<Book> {
    return this.bookModel.create(book);
  }

  updateBook(id: string, book: any): Promise<Book> {
    return this.bookModel.findOneAndUpdate({ _id: id }, book).exec();
  }

  deleteBook(id: string): Promise<Book> {
    return this.bookModel.findOneAndUpdate({ _id: id }, { archived: true }).exec();
  }


}
