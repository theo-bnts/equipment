import DatabasePool from './tools/DatabasePool.js';

class EquipmentLoanStateType {
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
      .collection('equipment_loan_state_type')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const equipmentLoanStateType = await DatabasePool
      .getConnection()
      .collection('equipment_loan_state_type')
      .findOne({ _id: id });

    return new EquipmentLoanStateType(equipmentLoanStateType._id, equipmentLoanStateType.name, equipmentLoanStateType.display_name_french);
  }

  static async fromName(name) {
    const equipmentLoanStateType = await DatabasePool
      .getConnection()
      .collection('equipment_loan_state_type')
      .findOne({ name });
    
    return new EquipmentLoanStateType(equipmentLoanStateType._id, equipmentLoanStateType.name, equipmentLoanStateType.display_name_french);
  }

  static async all() {
    const equipmentLoanStateTypes = await DatabasePool
      .getConnection()
      .collection('equipment_loan_state_type')
      .find()
      .toArray();
    
    return equipmentLoanStateTypes.map(async (equipmentLoanStateType) => {
      return new EquipmentLoanStateType(equipmentLoanStateType._id, equipmentLoanStateType.name, equipmentLoanStateType.display_name_french);
    });
  }
}

export default EquipmentLoanStateType;
