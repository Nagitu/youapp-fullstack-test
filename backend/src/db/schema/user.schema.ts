import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Profile } from './profile.schema';
import { ChatRoom } from './chatroom.schema';
import { Message } from './message.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User  {
  // @Prop({ type: String, default: uuidv4, unique: true })
  // id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile'  })
  profile: Profile;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }] })
  chatrooms: ChatRoom[];

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]  })
  messages: Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);
