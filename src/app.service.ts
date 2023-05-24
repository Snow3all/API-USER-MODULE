import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';
import { Order, OrderDocument } from './schema/orderActiom.schema';
import { OrderHistory, OrderHistoryDocument } from './schema/order.schema';
import { Products, ProductsDocument } from './schema/products.schema';
import { TokenData } from './dto/user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(OrderHistory.name)
    private readonly orderHistoryModel: Model<OrderHistoryDocument>,
    @InjectModel(Products.name)
    private readonly productModel: Model<ProductsDocument>,
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

  async getUserHistory(body: TokenData, res: Response) {
    try {
      console.log('body: ', body);
      const { _id } = body.data;
      const userOrder = await this.orderHistoryModel
        .findOne({
          customerId: _id,
        })
        .select('history')
        .populate('history.orderId')
        .populate('history.orderId.productId');
      const reMap = userOrder.history.map((data) => ({
        ...data,
        productDetail: data.orderId[0],
      }));
      return res.status(200).json({
        statusCode: 0,
        responseData: { data: reMap },
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
