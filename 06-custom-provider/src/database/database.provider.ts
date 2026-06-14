export const databaseProvider = {
  provide: 'DATABASE_CONFIG',
  useValue: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'mydb',
  },
};

export const connectionProvider = {
  provide: 'DATABSE_CONNECTION',
  useFactory: () => {
    return {
      connected: true,
      driver: 'postgresql',
      createdat: new Date(),
    };
  },
};
