import DatabasePool from './tools/DatabasePool.js';

class Type {
  Id;

  Name;

  OrganizationOnly;

  constructor(id, name, organizationOnly) {
    this.Id = id;
    this.Name = name;
    this.OrganizationOnly = organizationOnly;
  }

  async insert() {
    await DatabasePool
      .getConnection()
      .collection('type')
      .insertOne({
        name: this.Name,
        organization_only: this.OrganizationOnly,
      });
  }

  async delete() {
    await DatabasePool
      .getConnection()
      .collection('type')
      .deleteOne({ _id: this.Id });
  }

  format() {
    return {
      name: this.Name,
      organization_only: this.OrganizationOnly,
    };
  }

  static async nameExists(name) {
    return await DatabasePool
      .getConnection()
      .collection('type')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const type = await DatabasePool
      .getConnection()
      .collection('type')
      .findOne({ _id: id });

    return new Type(type._id, type.name, type.organization_only);
  }

  static async fromName(name) {
    const type = await DatabasePool
      .getConnection()
      .collection('type')
      .findOne({ name });

    return new Type(type._id, type.name, type.organization_only);
  }

  static async all() {
    const types = await DatabasePool
      .getConnection()
      .collection('type')
      .find()
      .toArray();

    return types.map((type) => new Type(
      type._id,
      type.name,
      type.organization_only,
    ));
  }
}

export default Type;
