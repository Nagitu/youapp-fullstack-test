import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [AuthModule, ProfileModule, UsersModule, MessagesModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
