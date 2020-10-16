import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type BookDocument = Book & Document;

@Schema()
class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  desc: string;

  @Prop()
  author: string;

  @Prop()
  cover: string;

  @Prop({ required: true, enum: ['PUBLIC', 'PRIVATE']})
  type: string;

  @Prop({ default: false })
  archived: boolean;


}


const BookSchema = SchemaFactory.createForClass(Book);


export {
  BookDocument,
  Book,
  BookSchema
}
