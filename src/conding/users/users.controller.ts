import { Body, Controller, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/sign-up')
  async signUp(@Body() user: any ): Promise<any> {
    return await this.usersService.addUser(user);
  }

  @Post('auth/sign-in')
  async signIn(@Body() user: any): Promise<any> {
    return await this.usersService.login(user);
  }

  @Put('auth/reset-password')
  async resetPassword(@Body() user: any): Promise<any> {
    return await this.usersService.resetPassword(user);
  }
}
