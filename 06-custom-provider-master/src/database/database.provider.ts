// contoh custom provider use value
export const databaseProvider = {
  provide: 'DATABASE_CONFIG',
  useValue: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'nestjs_db',
  },
};

// contoh custom provider use factory
export const connectionProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: () => {
    return {
      connected: true,
      driver: 'mysql2',
      createdAt: new Date(),
    };
  },
};
