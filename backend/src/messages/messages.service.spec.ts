import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../db/schema/message.schema';
import { ChatRoom } from '../db/schema/chatroom.schema';
import { RabbitMQService } from '../utils/rabbitmq.service';
import { CreateMessageDto } from './dto/create-message.dto';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageModel: Model<Message>;
  let chatRoomModel: Model<ChatRoom>;
  let rabbitMQService: RabbitMQService;
  let roomModel: any;

  beforeEach(async () => {

    roomModel = {
      findOne: jest.fn().mockResolvedValue({
        userIds: ['someUserId'], // Ensure userIds is defined
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: {
            new: jest.fn(),
            find: jest.fn(),
            create: jest.fn()
          },
        },
        {
          provide: getModelToken(ChatRoom.name),
          useValue: {
            find: jest.fn(),
            findOne : jest.fn(),
            findByIdAndUpdate : jest.fn()
          },
        },
        {
          provide: RabbitMQService,
          useValue: {
            // sendMessage: jest.fn().mockResolvedValue(undefined)
            sendMessage: jest.fn()
          }
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageModel = module.get<Model<Message>>(getModelToken(Message.name));
    chatRoomModel = module.get<Model<ChatRoom>>(getModelToken(ChatRoom.name));
    rabbitMQService = module.get<RabbitMQService>(RabbitMQService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new message and send a notification', async () => {
      const userId = 'user1';
      const createMessageDto: CreateMessageDto = {
        message: 'Hello, world!',
        chatRoom: 'chatRoom1',
      };
      const newMessage = {
        _id: 'message1',
        senderId: userId,
        message: createMessageDto.message,
        chatRoom: createMessageDto.chatRoom,
      };
      const rooms = [
        { _id: 'room1', userIds: [userId, 'user2'] },
      ];
      jest.spyOn(chatRoomModel,'findOne').mockResolvedValue(rooms as any)
      jest.spyOn(messageModel, 'create').mockResolvedValue(newMessage as any);
      jest.spyOn(rabbitMQService, 'sendMessage').mockResolvedValue(undefined);

      const result = await service.create(userId, createMessageDto);

      expect(result).toEqual(newMessage);
      expect(messageModel.create).toHaveBeenCalledWith({
        senderId: userId,
        message: createMessageDto.message,
        chatRoom: createMessageDto.chatRoom,
      });
    });
  });

  // describe('findOwnMessage', () => {
  //   it('should return messages and rooms if they exist', async () => {
  //     const userId = 'user1';
  //     const rooms = [
  //       { _id: 'room1', userIds: [userId, 'user2'] },
  //       { _id: 'room2', userIds: [userId, 'user3'] },
  //     ];
  //     const messages = [
  //       { _id: 'message1', chatRoom: 'room1', message: 'Hello' },
  //       { _id: 'message2', chatRoom: 'room2', message: 'Hi' },
  //     ];

  //     const populateMock = jest.fn().mockResolvedValue(rooms);
  //     jest.spyOn(chatRoomModel, 'find').mockReturnValue({ populate: populateMock } as any);
  //     jest.spyOn(messageModel, 'find').mockResolvedValue(messages as any);

  //     const result = await service.findOwnMessage(userId);

  //     expect(result).toEqual({ rooms, messages });
  //     expect(chatRoomModel.find).toHaveBeenCalledWith({ userIds: userId });
  //     expect(populateMock).toHaveBeenCalledWith('userIds');
  //     expect(messageModel.find).toHaveBeenCalledWith({ chatRoom: { $in: ['room1', 'room2'] } });
  //   });

  //   it('should throw NotFoundException if no rooms found', async () => {
  //     const userId = 'user1';
  //     const populateMock = jest.fn().mockResolvedValue([]);

  //     jest.spyOn(chatRoomModel, 'find').mockReturnValue({ populate: populateMock } as any);

  //     await expect(service.findOwnMessage(userId)).rejects.toThrow(NotFoundException);
  //     expect(chatRoomModel.find).toHaveBeenCalledWith({ userIds: userId });
  //     expect(populateMock).toHaveBeenCalledWith('userIds');
  //   });

  //   it('should throw NotFoundException if no messages found', async () => {
  //     const userId = 'user1';
  //     const rooms = [
  //       { _id: 'room1', userIds: [userId, 'user2'] },
  //       { _id: 'room2', userIds: [userId, 'user3'] },
  //     ];
  //     const populateMock = jest.fn().mockResolvedValue(rooms);

  //     jest.spyOn(chatRoomModel, 'find').mockReturnValue({ populate: populateMock } as any);
  //     jest.spyOn(messageModel, 'find').mockResolvedValue([]);

  //     await expect(service.findOwnMessage(userId)).rejects.toThrow(NotFoundException);
  //     expect(chatRoomModel.find).toHaveBeenCalledWith({ userIds: userId });
  //     expect(populateMock).toHaveBeenCalledWith('userIds');
  //     expect(messageModel.find).toHaveBeenCalledWith({ chatRoom: { $in: ['room1', 'room2'] } });
  //   });
  // });
  });

