import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'success get data ' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('like/:userId2')
  @ApiBearerAuth()
  @ApiParam({ name: 'userId2', required: true, description: 'User Id like' })
  @ApiResponse({ status: 201, description: 'success like' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  async likeUser(
    @Request() req,
    @Param('userId2') userId2: string,
  ) {
    const userId1 = req.user.id
    const chatroom = await this.usersService.likeUser(userId1, userId2);
    return chatroom ? { chatroomId: chatroom._id } : { message: 'Like recorded, but no mutual like found.' };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User Id ' })
  @ApiResponse({ status: 201, description: 'success like' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('')
  @ApiResponse({ status: 201, description: 'success update data' })
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.id
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
