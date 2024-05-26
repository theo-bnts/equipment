import DatabasePool from './tools/DatabasePool.js';
import Organization from './Organization.js';
import User from './User.js';

class UserOrganization {
  Id;

  User;

  Organization;

  constructor(id, user, organization) {
    this.Id = id;
    this.User = user;
    this.Organization = organization;
  }

  async insert() {
    const result = await DatabasePool
      .getConnection()
      .collection('user_organization')
      .insertOne({
        id_user: this.User.Id,
        id_organization: this.Organization.Id,
      });

    this.Id = result.insertedId;
  }

  format() {
    return {
      user: this.User.format(),
      organization: this.Organization.format(),
    };
  }

  static async exists(user, organization) {
    return await DatabasePool
      .getConnection()
      .collection('user_organization')
      .findOne({ id_user: user.Id, id_organization: organization.Id }) !== null;
  }

  static async fromId(id) {
    const userOrganization = await DatabasePool
      .getConnection()
      .collection('user_organization')
      .findOne({ _id: id });

    return new UserOrganization(
      userOrganization._id,
      await User.fromId(userOrganization.id_user),
      await Organization.fromId(userOrganization.id_organization),
    );
  }

  static async all(user) {
    const userOrganizations = await DatabasePool
      .getConnection()
      .collection('user_organization')
      .find({ id_user: user.Id })
      .toArray();
    
    return Promise.all(userOrganizations.map(async (userOrganization) => {
      return new UserOrganization(
        userOrganization._id,
        user,
        await Organization.fromId(userOrganization.id_organization),
      );
    }));
  }
}

export default UserOrganization;
