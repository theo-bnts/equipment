import DatabasePool from './tools/DatabasePool.js';

class RoleType {
  Id;

  Name;

  DisplayNameFrench;

  constructor(id, name, displayNameFrench) {
    this.Id = id;
    this.Name = name;
    this.DisplayNameFrench = displayNameFrench;
  }

  format() {
    return {
      name: this.Name,
      display_name_french: this.DisplayNameFrench,
    };
  }

  static async fromId(id) {
    const role = await DatabasePool
      .getConnection()
      .collection('role_type')
      .findOne({ _id: id });

    return new RoleType(role._id, role.name, role.display_name_french);
  }

  static async fromName(name) {
    const role = await DatabasePool
      .getConnection()
      .collection('role_type')
      .findOne({ name });

    return new RoleType(role._id, role.name, role.display_name_french);
  }
}

export default RoleType;
