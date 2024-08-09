import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../db/schema/user.schema';
import { Profile, ProfileSchema } from 'src/db/schema/profile.schema';
import { ChatRoom, ChatRoomSchema } from 'src/db/schema/chatroom.schema';
import { Like, LikeSchema } from 'src/db/schema/like.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports:[
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Like.name, schema: LikeSchema },
    { name: Profile.name, schema: ProfileSchema },
    { name: ChatRoom.name, schema:ChatRoomSchema }
  ]
)]
})
export class UsersModule {}
