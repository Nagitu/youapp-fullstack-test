import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type UserDocument = HydratedDocument<Like>;

@Schema({timestamps:true})
export class Like {

  @Prop({ required: true,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user1: User;

  @Prop({ required: true,type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user2: User;

  @Prop({ type: String, enum: ['like', 'not like'], required: true })
  operation: string;

}

export const LikeSchema = SchemaFactory.createForClass(Like);
