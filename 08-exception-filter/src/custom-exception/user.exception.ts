import { HttpException, HttpStatus } from '@nestjs/common';

export class UserException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
