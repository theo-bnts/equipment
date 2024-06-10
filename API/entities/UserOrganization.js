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

  async delete() {
    await DatabasePool
      .getConnection()
      .collection('user_organization')
      .deleteOne({ _id: this.Id });
  }

  format() {
    return {
      user: this.User.format(),
      organization: this.Organization.format(),
    };
  }

  static async userAndOrganizationExists(user, organization) {
    return await DatabasePool
      .getConnection()
      .collection('user_organization')
      .findOne({ id_user: user.Id, id_organization: organization.Id }) !== null;
  }

  static async userExists(user) {
    return await DatabasePool
      .getConnection()
      .collection('user_organization')
      .findOne({ id_user: user.Id }) !== null;
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

  static async fromUserAndOrganization(user, organization) {
    const userOrganization = await DatabasePool
      .getConnection()
      .collection('user_organization')
      .findOne({ id_user: user.Id, id_organization: organization.Id });

    return new UserOrganization(
      userOrganization._id,
      user,
      organization,
    );
  }

  static async allOfUser(user) {
    const userOrganizations = await DatabasePool
      .getConnection()
      .collection('user_organization')
      .find({ id_user: user.Id })
      .toArray();

    const userOrganizationsPromises = userOrganizations.map(
      async (userOrganization) => new UserOrganization(
        userOrganization._id,
        user,
        await Organization.fromId(userOrganization.id_organization),
      ),
    );

    return Promise.all(userOrganizationsPromises);
  }
}

export default UserOrganization;
