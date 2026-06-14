import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('DATABASE_CONFIG') private readonly config: any,
    @Inject('DATABASE_CONNECTION') private readonly connection: any,
  ) {}

  getConfig(): any {
    return this.config;
  }

  getConnection(): any {
    return this.connection;
  }
}
