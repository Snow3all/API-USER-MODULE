import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Order } from './orderActiom.schema';

export type OrderHistoryDocument = OrderHistory & Document;

@Schema()
export class OrderHistory {
  @Prop({ required: true })
  customer: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop({ ref: Order.name })
  history: [
    {
      createDate: Date;
      orderId: Types.ObjectId;
      status: string;
      totalPrice: number;
    },
  ];
}
export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
