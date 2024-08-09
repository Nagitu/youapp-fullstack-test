import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { UsersModule } from 'src/users/users.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {Profile, ProfileSchema } from '../db/schema/profile.schema';
import { User, UserSchema } from '../db/schema/user.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ConflictException ,NotFoundException} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileModel: Model<Profile>
  let userModel : Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getModelToken(Profile.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn()
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            
          },
        },
      ],

    }).compile();

    service = module.get<ProfileService>(ProfileService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    profileModel = module.get<Model<Profile>>(getModelToken(Profile.name));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMe', () => {
    it('should show a profile data', async () => {
      const userId = 'user1';
      const userData = {
        _id: 'id1',
        user: userId,
        birthday: "2024-12-02",
        zodiac: 'sagitarius',
        gender: "",
        height: null,
        weight: null,
        about: ""
      };
      jest.spyOn(profileModel, 'findOne').mockResolvedValue(userData as any);

      await expect(service.findMe(userId)).resolves.toEqual(userData);
    });

    it('should not show a profile ', async() =>{
      const userId = 'user1';
      jest.spyOn(profileModel, 'findOne').mockResolvedValue(null);

      await expect(service.findMe(userId)).rejects.toThrow(`this user don't have a profile , please setup first`)
    } )
  });
  

  describe('create', () => {
    it('should throw ConflictException if user already has a profile', async () => {
      const userId = 'user1';
      const createProfileDto: CreateProfileDto = {
        birthday: new Date('2024-12-02'),
        zodiac:'sagitarius',
        gender: 'male',
        weight: 70,
        height: 180,
        about: 'About me',
      };

      jest.spyOn(profileModel, 'findOne').mockResolvedValue({} as any);

      await expect(service.create(userId, createProfileDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it(`should throw NoFoundException if user don't have a profile`, async () =>{
      const userId = 'user1';
      jest.spyOn(profileModel, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
       });
    it('should show a profile data', async () => {
      const userId = 'user1';
      const userData = {
        _id: 'id1',
        user: userId,
        birthday: "2024-12-02",
        zodiac: 'sagitarius',
        gender: "",
        height: null,
        weight: null,
        about: ""
      };
      jest.spyOn(profileModel, 'findOne').mockResolvedValue(userData as any);
    
      await expect(service.findMe(userId)).resolves.toEqual(userData);
    });
  });

  describe('remove', () => {
    it('should success remove profile', async () => {
      const userId = 'user1';
      const existingUser = {
        _id: 'profile1',
        user: userId,
        birthday: new Date('2024-12-02'),
        zodiac: 'sagitarius',
        gender: 'male',
        weight: 70,
        height: 180,
        about: 'About me',
      };

      jest.spyOn(profileModel, 'findOne').mockResolvedValue(existingUser as any);
      jest.spyOn(profileModel, 'findOneAndDelete').mockResolvedValue({} as any);

      await service.remove(userId);

      expect(profileModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(profileModel.findOneAndDelete).toHaveBeenCalledWith({ user: userId });
    });

    it('should failed remove  profile ', async() =>{
      const user = 'user1';

      jest.spyOn(profileModel, 'findOne').mockResolvedValue(null);

      await expect(service.remove(user)).rejects.toThrow(NotFoundException);
      expect(profileModel.findOne).toHaveBeenCalledWith({ user });
      expect(profileModel.findOneAndDelete).not.toHaveBeenCalled();
    } )
  });

  describe('update', () => {
    it(`should throw NotFoundException if user doesn't have a profile`, async () => {
      const userId = 'user1';
      const updateProfileDto: UpdateProfileDto = {
        birthday: new Date('2024-12-02'),
        zodiac: 'sagitarius',
        gender: 'male',
        weight: 70,
        height: 180,
        about: 'About me',
      };

      jest.spyOn(profileModel, 'findOne').mockResolvedValue(null);

      await expect(service.update(userId, updateProfileDto)).rejects.toThrow(NotFoundException);
    });

    it('should update and return the profile if user has one', async () => {
      const userId = 'user1';
      const updateProfileDto: UpdateProfileDto = {
        birthday: new Date('2024-12-02'),
        zodiac: 'sagitarius',
        gender: 'male',
        weight: 70,
        height: 180,
        about: 'Updated about me',
      };

      const existingUser = {
        _id: 'profile1',
        user: userId,
        birthday: new Date('2024-12-02'),
        zodiac: 'sagitarius',
        gender: 'male',
        weight: 70,
        height: 180,
        about: 'About me',
      };

      const updatedProfile = {
        _id: 'profile1',
        user: userId,
        birthday: new Date('2024-12-02'),
        zodiac: 'sagitarius',
        gender: 'male',
        weight: 70,
        height: 180,
        about: 'Updated about me',
      };

      jest.spyOn(profileModel, 'findOne').mockResolvedValue(existingUser as any);
      jest.spyOn(profileModel, 'findOneAndUpdate').mockResolvedValue(updatedProfile as any);

      const result = await service.update(userId, updateProfileDto);

      expect(result).toEqual(updatedProfile);
      expect(profileModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(profileModel.findOneAndUpdate).toHaveBeenCalledWith(
        { user: userId },
        { $set: updateProfileDto },
        { new: true, runValidators: true }
      );
    });
  });
  });


