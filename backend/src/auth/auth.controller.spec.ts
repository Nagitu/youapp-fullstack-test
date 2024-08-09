import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('test-token'),
          },
        },
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should return access token', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'testpass' };
      const result = { access_token: 'token' };

      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await authController.signIn(loginDto)).toBe(result);
      expect(authService.signIn).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should return success message', async () => {
      const registerDto: RegisterDto = { username: 'newuser', email: 'test@example.com', password: 'testpass' };
      const result = { message: 'User successfully registered' };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await authController.register(registerDto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});
