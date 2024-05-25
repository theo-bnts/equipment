import 'dotenv/config';

import mongoose from 'mongoose';

class DatabasePool {
  static Instance;

  constructor() {
    if (DatabasePool.Instance) {
      return DatabasePool.Instance;
    }

    this.connect();

    DatabasePool.Instance = this;
  }

  async connect() {
    const URI = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

    await mongoose.connect(URI);
  }

  static getConnection() {
    return mongoose.connection;
  }
}

export default DatabasePool;
