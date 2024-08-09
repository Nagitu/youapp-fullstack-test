import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/db/schema/profile.schema';
import { Message, MessageSchema } from 'src/db/schema/message.schema';
import { UsersModule } from '../users/users.module';
import { RabbitMQService } from '../utils/rabbitmq.service';
import { ChatRoom, ChatRoomSchema } from 'src/db/schema/chatroom.schema';
import { User, UserSchema } from '@src/db/schema/user.schema';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService,RabbitMQService],
  imports:[UsersModule,MongooseModule.forFeature([
  { name: Profile.name, schema: ProfileSchema},
  { name: Message.name, schema: MessageSchema}, 
  { name: ChatRoom.name, schema: ChatRoomSchema}, 
  { name: User.name, schema: UserSchema}, 
 ])],
 exports:[MessagesService]
})
export class MessagesModule {}
