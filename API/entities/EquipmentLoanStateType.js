import DatabasePool from './tools/DatabasePool.js';

class EquipmentLoanStateType {
  Id;

  Name;

  constructor(id, name,) {
    this.Id = id;
    this.Name = name;
  }

  format() {
    return {
      name: this.Name,
    };
  }

  static async fromId(id) {
    const equipmentLoanStateType = await DatabasePool
      .getConnection()
      .collection('equipment_loan_state_type')
      .findOne({ _id: id });

    return new EquipmentLoanStateType(equipmentLoanStateType._id, equipmentLoanStateType.name);
  }

  static async all() {
    const equipmentLoanStateTypes = await DatabasePool
      .getConnection()
      .collection('equipment_loan_state_type')
      .find()
      .toArray();
    
    return equipmentLoanStateTypes.map(async (equipmentLoanStateType) => {
      return new EquipmentLoanStateType(equipmentLoanStateType._id, equipmentLoanStateType.name);
    });
  }
}

export default EquipmentLoanStateType;