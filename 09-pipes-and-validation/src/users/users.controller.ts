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
   * Menggunakan ClassValidationPipe (custom manual) di level parameter
   * Ini menunjukkan cara parameter-scoped pipe
   *
   * Contoh body valid:
   *   { "username": "johndoe", "email": "john@example.com", "password": "secret123", "role": "user" }
   * Contoh body invalid:
   *   { "username": "jo", "email": "bukan-email" }
   */
  @Post()
  create(@Body(new ClassValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * GET /users/:id
   * Menggunakan CustomParseIntPipe (custom transformation pipe)
   * Validasi tambahan: ID harus >= 1
   *
   * Coba: GET /users/abc    → Error: "abc" bukan angka integer
   * Coba: GET /users/0      → Error: ID harus berupa angka positif
   * Coba: GET /users/1      → Berhasil
   */
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
