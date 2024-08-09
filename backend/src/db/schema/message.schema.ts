import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { ChatRoom } from './chatroom.schema';
import { User } from './user.schema';
export type UserDocument = HydratedDocument<Message>;

@Schema({timestamps:true})
export class Message  {

  @Prop({ required: true,type: mongoose.Schema.Types.ObjectId, ref: 'User',})
  senderId: User;

  @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom',})
  chatRoom: ChatRoom;

  @Prop({ required: true})
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
