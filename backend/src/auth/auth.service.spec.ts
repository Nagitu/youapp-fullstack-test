import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../db/schema/user.schema'; // Gunakan path relatif
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token if credentials are valid', async () => {
      const username = 'testuser';
      const password = 'testpass';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = { id: '1', username, password: hashedPassword };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      const result = await service.signIn({ username, password });

      expect(result).toEqual({ access_token: 'token' });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await expect(service.signIn({ username: 'wronguser', password: 'testpass' })).rejects.toThrow('User not found');
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const username = 'testuser';
      const password = 'testpass';
      const hashedPassword = await bcrypt.hash('wrongpass', 10);

      const user = { id: '1', username, password: hashedPassword };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.signIn({ username, password })).rejects.toThrow('Wrong Password, please input right password');
    });
  });

  describe('register', () => {
    it('should return success message if user is registered', async () => {
      const username = 'newuser';
      const email = 'test@example.com';
      const password = 'testpass';
      const hashedPassword = await bcrypt.hash(password, 10);

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(userModel, 'create').mockResolvedValue({
        username,
        email,
        password: hashedPassword,
      } as any);

      const result = await service.register({ username, email, password });

      expect(result).toEqual({ message: 'User registered successfully' });
    });

    it('should throw ConflictException if username already exists', async () => {
      const username = 'existinguser';
      const email = 'test@example.com';
      const password = 'testpass';

      const existingUser = { id: '1', username, email, password };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(existingUser as any);

      await expect(service.register({ username, email, password })).rejects.toThrow('Username already exists');
    });
  });
});
