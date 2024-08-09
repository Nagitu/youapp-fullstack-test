import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post('sendMessage')
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 201, description: 'send message successfull' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    const id= req.user.id
    return this.messagesService.create(id,createMessageDto);
  }

  @UseGuards(AuthGuard)
  @Get('viewMessage')
  @ApiResponse({ status: 200, description: 'data successfull get' })
  findAll(@Request() req) {
    const id = req.user.id
    return this.messagesService.findOwnMessage(id);
  }

}
