import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../db/schema/profile.schema';
import { User } from '../db/schema/user.schema';
import { Model } from 'mongoose';
import { getZodiacSign } from '../utils/zodiac.utils';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}


  async create(userId:string,createProfileDto: CreateProfileDto): Promise<Profile> {
    const {birthday, gender, weight, height ,about } = createProfileDto;
    const isUSerExist = await this.profileModel.findOne({ user: userId });
    if(isUSerExist){
      throw new ConflictException('this user already has a profile')
    }
    const zodiac = birthday ? getZodiacSign(new Date(birthday)) : '';
    const newProfile = await this.profileModel.create({
      user: userId || '',
      birthday: birthday || null, 
      zodiac,
      gender: gender || '',
      weight: weight || '',
      height: height || '',
      about: about || '',
    });

    await this.userModel.findByIdAndUpdate(userId, { profile: newProfile._id });
    return newProfile;
  }


  async findOne(userId: string) {
    const profile = await this.profileModel.findOne({user:userId})
    if(!profile){
      throw new NotFoundException(`this user don't have a profile , please setup first`)
    }
    return profile;
  }

  async findMe(userId: string) {
    const profile = await this.profileModel.findOne({user:userId})
    if(!profile){
      throw new NotFoundException(`this user don't have a profile , please setup first`)
    }
    return profile;
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const existingUser = await this.profileModel.findOne({user:userId});
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { user: userId },
      { $set: updateProfileDto },
      { new: true, runValidators: true }
    );
    return updatedProfile
  }

  async remove(user_id: string) {
    const existingUser = await this.profileModel.findOne({user:user_id});
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
  return this.profileModel.findOneAndDelete({user:user_id})
  }
}
