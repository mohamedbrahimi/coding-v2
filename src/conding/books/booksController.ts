import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('books')
  async getAll(@Res() res: any) {
    const books =  await this.booksService.getBooks();
    return res.status(200).json({
      success: true,
      data: {
        books
      }
    })
  }

  @Get('books/:id')
  async getOne(@Res() res: any, @Param('id') id: string) {
    const book =  await this.booksService.getSingleBook(id);
    return res.status(200).json({
      success: true,
      data: book
    })
  }

  @Post('books')
  async postOne(@Res() res: any, @Body() book: any) {
    await this.booksService.addBook(book);
    return res.status(200).json({
      success: true,
    })
  }

  @Put('books/:id')
  async putOne(@Res() res: any, @Param('id') id: string, @Body() book: any) {
    await this.booksService.updateBook(id, book);
    return res.status(200).json({
      success: true,
    })
  }

  @Delete('books/:id')
  async deleteOne(@Res() res: any, @Param('id') id: string) {
     await this.booksService.deleteBook(id);
    return res.status(200).json({
      success: true
    })
  }
}
