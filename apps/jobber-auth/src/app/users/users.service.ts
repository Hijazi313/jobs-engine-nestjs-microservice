import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/jobber-auth';
import { hash } from 'argon2';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserInput: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await hash(createUserInput.password);
    const user = await this.prismaService.user.create({
      data: { ...createUserInput, password: hashedPassword },
    });

    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: args,
    });
  }
}
