import DatabasePool from './tools/DatabasePool.js';
import EquipmentReference from './EquipmentReference.js';
import Room from './Room.js';
import EquipmentLoanStateType from './EquipmentLoanStateType.js';

class Equipment {
  Id;

  Code;

  EquipmentReference;

  StockageRoom;

  constructor(id, code, equipmentReference, stockageRoom) {
    this.Id = id;
    this.Code = code;
    this.EquipmentReference = equipmentReference;
    this.StockageRoom = stockageRoom;
  }

  async isAvailable() {
    const unvailableStateTypes = [
      await EquipmentLoanStateType.fromName('Demandé'),
      await EquipmentLoanStateType.fromName('Emprunté'),
      await EquipmentLoanStateType.fromName('Retour demandé'),
    ]

    return await DatabasePool
      .getConnection()
      .collection('equipment_loan')
      .find({
        id_equipment: this.Id,
        id_state_type: { $in: unvailableStateTypes.map(stateType => stateType.Id) },
      })
      .count() === 0;
  }

  format() {
    return {
      code: this.Code,
      equipment_reference: this.EquipmentReference.format(),
      stockage_room: this.StockageRoom.format(),
    };
  }

  static async codeExists(code) {
    return await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ code }) !== null;
  }

  static async fromId(id) {
    const equipment = await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ _id: id });

    return new Equipment(
      equipment._id,
      equipment.code,
      await EquipmentReference.fromId(equipment.id_equipment_reference),
      await Room.fromId(equipment.id_stockage_room),
    );
  }

  static async fromCode(code) {
    const equipment = await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ code });

    return new Equipment(
      equipment._id,
      equipment.code,
      await EquipmentReference.fromId(equipment.id_equipment_reference),
      await Room.fromId(equipment.id_stockage_room),
    );
  }

  static async all() {
    const equipments = await DatabasePool
      .getConnection()
      .collection('equipment')
      .find()
      .toArray();
    
    return Promise.all(equipments.map(async (equipment) => {
      return new Equipment(
        equipment._id,
        equipment.code,
        await EquipmentReference.fromId(equipment.id_equipment_reference),
        await Room.fromId(equipment.id_stockage_room),
      );
    }));
  }

  static async allOfReference(equipmentReference) {
    const equipments = await DatabasePool
      .getConnection()
      .collection('equipment')
      .find({ id_equipment_reference: equipmentReference.Id })
      .toArray();
    
    return Promise.all(equipments.map(async (equipment) => {
      return new Equipment(
        equipment._id,
        equipment.code,
        equipmentReference,
        await Room.fromId(equipment.id_stockage_room),
      );
    }));
  }
}

export default Equipment;
