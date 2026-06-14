import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getDatabaseConfig(): any {
    return this.userService.getDatabaseConfig();
  }

  @Get('connection')
  getDatabaseConnection(): any {
    return this.userService.getDatabaseConnection();
  }
}
