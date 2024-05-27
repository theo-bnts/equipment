import DatabasePool from './tools/DatabasePool.js';
import EquipmentReference from './EquipmentReference.js';
import Room from './Room.js';

class Equipment {
  Id;

  EquipmentReference;

  StockageRoom;

  constructor(id, equipmentReference, stockageRoom) {
    this.Id = id;
    this.EquipmentReference = equipmentReference;
    this.StockageRoom = stockageRoom;
  }

  format() {
    return {
      equipment_reference: this.EquipmentReference.format(),
      stockage_room: this.StockageRoom.format(),
    };
  }

  static async fromId(id) {
    const equipment = await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ _id: id });

    return new Equipment(
      equipment._id,
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
        equipmentReference,
        await Room.fromId(equipment.id_stockage_room),
      );
    }));
  }
}

export default Equipment;
