import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthGuard } from '../auth/auth.guard';

describe('MessagesController', () => {
  let app: INestApplication;
  let messagesController : MessagesController;
  let messagesService : MessagesService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        MessagesService,
        {
          provide: MessagesService,
          useValue: {
            create : jest.fn(),
            findOwnMessage : jest.fn()
          }
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context) => {
          const request = context.switchToHttp().getRequest();
          request.user = { id: 'someUserId' }; // Mocked user
          return true;
        },
      })
      .compile();

      messagesService = moduleRef.get<MessagesService>(MessagesService);
      messagesController = moduleRef.get<MessagesController>(MessagesController)
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(messagesController).toBeDefined();
  });
  afterAll(async () => {
    await app.close();
  });
});
