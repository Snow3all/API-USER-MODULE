import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';
import { TokenData } from './dto/user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async getProfile(body: TokenData, res: Response) {
    try {
      const { _id } = body.data;
      const userProfile = await this.userModel
        .findOne({ _id: _id })
        .select('username name email');
      return res.status(200).json({
        statusCode: 0,
        responseData: { data: userProfile },
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }

  async getUserOrder(body: TokenData, res: Response) {
    try {
      const { _id } = body.data;
      const userOrder = await this.userModel
        .findOne({ _id: _id })
        .select('orederRef')
        .populate('orderRef');
      return res.status(200).json({
        statusCode: 0,
        responseData: { data: userOrder },
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }
}
