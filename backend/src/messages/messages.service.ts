import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../db/schema/message.schema';
import { Model } from 'mongoose';
import { RabbitMQService } from '../utils/rabbitmq.service';
import { ChatRoom } from '../db/schema/chatroom.schema';


@Injectable()
export class MessagesService {

  constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(Message.name) private MessageModel: Model<Message>,
    private rabbitMQService: RabbitMQService 
  ) {}
  
  
  async create(userId: string, createMessageDto: CreateMessageDto) {
    const { message, chatRoom } = createMessageDto;
    const room = await this.chatRoomModel.findOne({
      _id:chatRoom,
      userIds: userId
    });

    if (!room) {
      throw new ForbiddenException('Room not found or user is not in the RoomChat');
    }
  
    const newMessage = await this.MessageModel.create({
      senderId: userId,
      message: message || null,
      chatRoom: chatRoom,
    });
  
    await this.chatRoomModel.findByIdAndUpdate(newMessage.chatRoom,{ $push: { messages: newMessage._id } })
    return newMessage
  
    const notification = {
      event: 'message_created',
      data: newMessage,
    };
  
    await this.rabbitMQService.sendMessage(JSON.stringify(notification));
  
    return newMessage;
  }
  

   async findOwnMessage(id: string) {
    // Temukan semua chatroom yang berisi userId
    const rooms = await this.chatRoomModel.find({ userIds: id }).populate('messages').populate('userIds');
    
    // Jika tidak ada chatroom yang ditemukan, lemparkan NotFoundException
    if (rooms.length === 0) {
      throw new NotFoundException('room not found');
    }
    
    // Mempersiapkan hasil yang akan dikembalikan
    const result = rooms.map(room => {
      return {
        chatRoomId: room._id,
        userIds: room.userIds,
        messages: room.messages,
      };
    });
  
    // Kembalikan hasil akhir
    return result;
  }
  
  }
  
