import 'dotenv/config';

import mongoose from 'mongoose';

class DatabasePool {
  static URI = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

  constructor() {
    mongoose.connect(DatabasePool.URI);
  }

  static getConnection() {
    return mongoose.connection;
  }
}

export default DatabasePool;
