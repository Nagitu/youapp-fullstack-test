import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/db/schema/profile.schema';
import { User, UserSchema } from 'src/db/schema/user.schema';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports:[UsersModule,MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema}]),    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
]
})
export class ProfileModule {}
