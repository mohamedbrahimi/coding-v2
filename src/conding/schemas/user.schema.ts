import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type UserDocument = User & Document;

@Schema()
class User {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  archived: boolean;


}


const UserSchema = SchemaFactory.createForClass(User);


export {
  UserDocument,
  User,
  UserSchema
}
