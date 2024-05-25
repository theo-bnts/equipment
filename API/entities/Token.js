import DatabasePool from './tools/DatabasePool.js';

class Token {
  Id;

  Value;

  Expiration;

  User;

  constructor(id, value, expiration, user) {
    this.Value = value;
    this.Expiration = expiration;
    this.User = user;
  }

  async insert() {
    await DatabasePool
      .getConnection()
      .collection('token')
      .insertOne({
        value: this.Value,
        expiration: this.Expiration,
        id_user: this.User.Id,
      });
  }

  async update() {
    await DatabasePool
      .getConnection()
      .collection('token')
      .updateOne(
        { _id: this.Id },
        {
          $set: {
            expiration: this.Expiration,
            id_user: this.User.Id,
          },
        },
      );
  }

  static async isValidValue(value) {
  }

  static async fromValue(value) {
  }
}

export default Token;
