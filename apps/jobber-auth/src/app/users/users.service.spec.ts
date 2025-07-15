import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getUsers', () => {
  //   it('should return "Hello API"', () => {
  //     expect(service.getUsers()).toEqual([]);
  //   });
  // });
});
