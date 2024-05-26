import DatabasePool from './tools/DatabasePool.js';

class Organization {
  Id;

  Name;

  constructor(id, name) {
    this.Id = id;
    this.Name = name;
  }

  format() {
    return {
      name: this.Name,
    };
  }

  static async nameExists(name) {
    return await DatabasePool
      .getConnection()
      .collection('organization')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const organization = await DatabasePool
      .getConnection()
      .collection('organization')
      .findOne({ _id: id });

    return new Organization(organization._id, organization.name);
  }

  static async fromName(name) {
    const organization = await DatabasePool
      .getConnection()
      .collection('organization')
      .findOne({ name });

    return new Organization(organization._id, organization.name);
  }
}

export default Organization;
