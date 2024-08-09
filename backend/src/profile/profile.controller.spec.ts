import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtService } from '@nestjs/jwt';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService : ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: 
      [ProfileService, {
        provide: JwtService,
        useValue: {
          signAsync: jest.fn().mockResolvedValue('test-token'),
        },
      },
        {
          provide: ProfileService,
          useValue : {
            create: jest.fn(),
            findOne : jest.fn(),
            findMe : jest.fn(),
            update : jest.fn(),
            remove : jest.fn()
          }
        }

      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
