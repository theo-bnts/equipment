import DatabasePool from './tools/DatabasePool.js';

class RoleType {
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

  static async fromId(id) {
    const role = await DatabasePool
      .getConnection()
      .collection('role_type')
      .findOne({ _id: id });

    return new RoleType(role._id, role.name);
  }
}

export default RoleType;
