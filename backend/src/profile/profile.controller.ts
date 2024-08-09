import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Profile } from '../db/schema/profile.schema';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Profile success added' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({type:CreateProfileDto})
  async create(@Body() createProfileDto: CreateProfileDto, @Request() req) :Promise<Profile>{
    return this.profileService.create(req.user.id,createProfileDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User ID',example:'66926b624f0ace58c8e2b641' })
  @ApiResponse({ status: 200, description: 'Profile shows' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  findOne(@Param('id') id: string):Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @UseGuards(AuthGuard) 
  @Get('')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Profile shows' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMe(@Request() req):Promise<Profile> {
    return this.profileService.findMe(req.user.id);
    
  }

  @UseGuards(AuthGuard)
  @Patch('/update/')
  @ApiBearerAuth()
  @ApiBody({type: UpdateProfileDto})
  @ApiResponse({ status: 200, description: 'Profile success updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Body() updateProfileDto: UpdateProfileDto , @Request() req):Promise<Profile> {
    return this.profileService.update(req.user.id, updateProfileDto);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Profile deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Request() req) {
    return this.profileService.remove(req.user.id);
  }
}
