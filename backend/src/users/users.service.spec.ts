import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { User } from '../db/schema/user.schema';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from '../db/schema/profile.schema';
import { Like } from '../db/schema/like.schema';
import { ChatRoom } from '../db/schema/chatroom.schema';

describe('UsersService', () => {
  let service: UsersService;
  let chatroomModel : Model<ChatRoom>
  let likeModel : Model<Like>
  let userModel: Model<User>;
  let profileModel : Model<Profile>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Profile.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(Like.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(ChatRoom.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    profileModel = module.get<Model<Profile>>(getModelToken(Profile.name));
    chatroomModel = module.get<Model<ChatRoom>>(getModelToken(ChatRoom.name));
    likeModel = module.get<Model<Like>>(getModelToken(Like.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
