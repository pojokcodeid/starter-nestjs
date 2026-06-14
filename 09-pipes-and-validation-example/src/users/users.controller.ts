import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ClassValidationPipe } from 'src/common/pipes/class-validation.pipe';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /users
   */
  @Post()
  create(@Body(new ClassValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * GET /users/:id
   */
  @Get(':id')
  findOne(@Param('id', new CustomParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }
}
