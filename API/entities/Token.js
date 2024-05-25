import DatabasePool from './tools/DatabasePool.js';
import User from './User.js';

class Token {
  Id;

  Value;

  Expiration;

  User;

  constructor(id, value, expiration, user) {
    this.Id = id;
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
            value: this.Value,
            expiration: this.Expiration,
            id_user: this.User.Id,
          },
        },
      );
  }

  static async isValidValue(value) {
    const token = await DatabasePool
      .getConnection()
      .collection('token')
      .findOne({ value });

    return token !== null;
  }

  static async fromValue(value) {
    const token = await DatabasePool
      .getConnection()
      .collection('token')
      .findOne({ value });
    
    return new Token(
      token._id,
      token.value,
      token.expiration,
      await User.fromId(token.id_user),
    );
  }
}

export default Token;
