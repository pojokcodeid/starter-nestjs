import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'alice',
      email: 'alice@example.com',
      role: UserRole.ADMIN,
    },
    { id: 2, username: 'bob', email: 'bob@example.com', role: UserRole.USER },
  ];
  private nextId = 3;

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  create(dto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      username: dto.username,
      email: dto.email,
      role: dto.role ?? UserRole.USER,
    };
    this.users.push(user);
    return user;
  }
}
