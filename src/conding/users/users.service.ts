import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addUser(user: any): Promise<any> {
    const { firstName, lastName, email, password } = user;
    const ngPassword = await bcrypt.hash(password, 10);
    const ngUser: any = { lastName, firstName, email, password: ngPassword}
    try {
      const newUser = await this.userModel.create(ngUser);
      return {
          success: true,
          newUser: {
            email,
          }
      }
    } catch (e) {
      if (e.code === 11000)
         throw new ConflictException('USER_ALWAYS_EXISTS');

      throw new Error('UNKNOWN_ERROR');
    }

  }

  async login(user: any): Promise<any> {

    const { email, password } = user;
    const existingUser = await this.userModel.findOne({ email, archived: false }).exec();

    if (!existingUser)
      throw new NotFoundException('USER_NOT_FOUND');

    if (!await bcrypt.compare(password, existingUser.password))
      throw new UnauthorizedException('INVALID_CREDENTIALS');

    return { success: true }

  }


  async resetPassword(user: any): Promise<any> {
    const { email, password } = user;
    const ngPassword = await bcrypt.hash(password, 10);
    const updatedUser = await this.userModel.findOneAndUpdate({ email, archived: false }, { password: ngPassword }).exec();

    if (!updatedUser)
    throw new NotFoundException('USER_NOT_FOUND');

    return { success: true }
  }


}
