import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({timestamps:true})
export class ChatRoom {

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]  })
  userIds: mongoose.Schema.Types.ObjectId[];

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]  })
  messages: mongoose.Schema.Types.ObjectId[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
