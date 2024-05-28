import DatabasePool from './tools/DatabasePool.js';
import EquipmentType from './EquipmentType.js';

class EquipmentReference {
  Id;

  Name;

  EquipmentType;

  constructor(id, name, equipmentType) {
    this.Id = id;
    this.Name = name;
    this.EquipmentType = equipmentType;
  }

  format() {
    return {
      name: this.Name,
      equipment_type: this.EquipmentType.format(),
    };
  }

  static async nameExists(name) {
    return await DatabasePool
      .getConnection()
      .collection('equipment_reference')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const equipmentReference = await DatabasePool
      .getConnection()
      .collection('equipment_reference')
      .findOne({ _id: id });

    return new EquipmentReference(
      equipmentReference._id,
      equipmentReference.name,
      await EquipmentType.fromId(equipmentReference.id_equipment_type),
    );
  }

  static async fromName(name) {
    const equipmentReference = await DatabasePool
      .getConnection()
      .collection('equipment_reference')
      .findOne({ name });
    
    return new EquipmentReference(
      equipmentReference._id,
      equipmentReference.name,
      await EquipmentType.fromId(equipmentReference.id_equipment_type),
    );
  }

  static async all() {
    const equipmentReferences = await DatabasePool
      .getConnection()
      .collection('equipment_reference')
      .find()
      .toArray();
    
    return Promise.all(equipmentReferences.map(async (equipmentReference) => {
      return new EquipmentReference(
        equipmentReference._id,
        equipmentReference.name,
        await EquipmentType.fromId(equipmentReference.id_equipment_type),
      );
    }));
  }

  static async allOfType(equipmentType) {
    const equipmentReferences = await DatabasePool
      .getConnection()
      .collection('equipment_reference')
      .find({ id_equipment_type: equipmentType.Id })
      .toArray();
    
    return Promise.all(equipmentReferences.map(async (equipmentReference) => {
      return new EquipmentReference(
        equipmentReference._id,
        equipmentReference.name,
        equipmentType,
      );
    }));
  }
}

export default EquipmentReference;
