import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TokenData } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/profile')
  registerUser(@Body() body: TokenData, @Res() res: Response) {
    return this.appService.getProfile(body, res);
  }

  @Post('/orders')
  getUserOrder(@Body() body: TokenData, @Res() res: Response) {
    return this.appService.getUserOrder(body, res);
  }
}
