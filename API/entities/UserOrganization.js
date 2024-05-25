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

  static async fromId(id) {
    const userOrganization = await DatabasePool
      .getConnection()
      .collection('user_organization')
      .findOne({ _id: id });

    const user = await User.fromId(userOrganization.id_user);

    const organization = await Organization.fromId(userOrganization.id_organization);

    return new UserOrganization(userOrganization._id, user, organization);
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
