import RoleType from './RoleType.js';
import DatabasePool from './tools/DatabasePool.js';
import Security from './tools/Security.js';

class User {
  Id;

  EmailAddress;

  PasswordHash;

  PasswordHashSalt;

  FirstName;

  LastName;

  Role;

  constructor(
    id,
    emailAddress,
    passwordHash,
    passwordHashSalt,
    firstName,
    lastName,
    role,
  ) {
    this.Id = id;
    this.EmailAddress = emailAddress;
    this.PasswordHash = passwordHash;
    this.PasswordHashSalt = passwordHashSalt;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Role = role;
  }

  isValidPassword(password) {
    return this.PasswordHash === Security.hashPassword(password, this.PasswordHashSalt);
  }

  async insert() {
    const result = await DatabasePool
      .getConnection()
      .collection('user')
      .insertOne({
        email_address: this.EmailAddress,
        password_hash: this.PasswordHash,
        password_hash_salt: this.PasswordHashSalt,
        first_name: this.FirstName,
        last_name: this.LastName,
        id_role_type: this.Role.Id,
      });

    this.Id = result.insertedId;
  }

  async update() {
    await DatabasePool
      .getConnection()
      .collection('user')
      .updateOne(
        { _id: this.Id },
        {
          $set: {
            email_address: this.EmailAddress,
            password_hash: this.PasswordHash,
            password_hash_salt: this.PasswordHashSalt,
            first_name: this.FirstName,
            last_name: this.LastName,
            id_role_type: this.Role.Id,
          },
        },
      );
  }

  async delete() {
    await DatabasePool
      .getConnection()
      .collection('user')
      .deleteOne({ _id: this.Id });
  }

  format() {
    return {
      email_address: this.EmailAddress,
      first_name: this.FirstName,
      last_name: this.LastName,
      role: this.Role.format(),
    };
  }

  static async isEmailAddressInserted(emailAddress) {
    const user = await DatabasePool
      .getConnection()
      .collection('user')
      .findOne({ email_address: emailAddress });
    
    return user !== null;
  }

  static async fromId(id) {
    const user = await DatabasePool
      .getConnection()
      .collection('user')
      .findOne({ _id: id });
    
    return new User(
      user._id,
      user.email_address,
      user.password_hash,
      user.password_hash_salt,
      user.first_name,
      user.last_name,
      await RoleType.fromId(user.id_role_type),
    );
  }

  static async fromEmailAddress(emailAddress) {
    const user = await DatabasePool
      .getConnection()
      .collection('user')
      .findOne({ email_address: emailAddress });

    return new User(
      user._id,
      user.email_address,
      user.password_hash,
      user.password_hash_salt,
      user.first_name,
      user.last_name,
      await RoleType.fromId(user.id_role_type),
    );
  }
}

export default User;
