import DatabasePool from './tools/DatabasePool.js';

class EquipmentType {
  Id;

  Name;

  OrganizationOnly;

  constructor(id, name, organizationOnly) {
    this.Id = id;
    this.Name = name;
    this.OrganizationOnly = organizationOnly;
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
      .collection('equipment_type')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const equipmentType = await DatabasePool
      .getConnection()
      .collection('equipment_type')
      .findOne({ _id: id });

    return new EquipmentType(equipmentType._id, equipmentType.name, equipmentType.organization_only);
  }

  static async fromName(name) {
    const equipmentType = await DatabasePool
      .getConnection()
      .collection('equipment_type')
      .findOne({ name });

    return new EquipmentType(equipmentType._id, equipmentType.name, equipmentType.organization_only);
  }

  static async all() {
    const equipmentTypes = await DatabasePool
      .getConnection()
      .collection('equipment_type')
      .find()
      .toArray();
    
    return equipmentTypes.map(async (equipmentType) => {
      return new EquipmentType(
        equipmentType._id,
        equipmentType.name,
        equipmentType.organization_only
      );
    });
  }
}

export default EquipmentType;
