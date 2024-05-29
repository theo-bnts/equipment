import DatabasePool from './tools/DatabasePool.js';

class StateType {
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

  static async nameExists(name) {
    return await DatabasePool
      .getConnection()
      .collection('state_type')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const stateType = await DatabasePool
      .getConnection()
      .collection('state_type')
      .findOne({ _id: id });

    return new StateType(
      stateType._id,
      stateType.name,
      stateType.display_name_french,
    );
  }

  static async fromName(name) {
    const stateType = await DatabasePool
      .getConnection()
      .collection('state_type')
      .findOne({ name });

    return new StateType(
      stateType._id,
      stateType.name,
      stateType.display_name_french,
    );
  }

  static async all() {
    const stateTypes = await DatabasePool
      .getConnection()
      .collection('state_type')
      .find()
      .toArray();

    return stateTypes.map((stateType) => new StateType(
      stateType._id,
      stateType.name,
      stateType.display_name_french,
    ));
  }
}

export default StateType;
