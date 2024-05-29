import DatabasePool from './tools/DatabasePool.js';
import Reference from './Reference.js';
import Room from './Room.js';
import StateType from './StateType.js';

class Equipment {
  Id;

  Code;

  Reference;

  StockageRoom;

  EndOfLifeDate;

  constructor(id, code, reference, stockageRoom, endOfLifeDate) {
    this.Id = id;
    this.Code = code;
    this.Reference = reference;
    this.StockageRoom = stockageRoom;
    this.EndOfLifeDate = endOfLifeDate;
  }

  async isAvailable() {
    const unvailableStateTypes = [
      await StateType.fromName('REQUESTED'),
      await StateType.fromName('LOANED'),
      await StateType.fromName('RETURN_REQUESTED'),
    ];

    return await DatabasePool
      .getConnection()
      .collection('loan')
      .find({
        id_equipment: this.Id,
        id_state_type: { $in: unvailableStateTypes.map((stateType) => stateType.Id) },
      })
      .count() === 0;
  }

  async insert() {
    await DatabasePool
      .getConnection()
      .collection('equipment')
      .insertOne({
        code: this.Code,
        id_reference: this.Reference.Id,
        id_stockage_room: this.StockageRoom.Id,
        end_of_life_date: this.EndOfLifeDate,
      });
  }

  async delete() {
    await DatabasePool
      .getConnection()
      .collection('equipment')
      .deleteOne({ _id: this.Id });
  }

  format() {
    return {
      code: this.Code,
      reference: this.Reference.format(),
      stockage_room: this.StockageRoom.format(),
      end_of_life_date: this.EndOfLifeDate,
    };
  }

  static async codeExists(code) {
    return await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ code }) !== null;
  }

  static async referenceExists(reference) {
    return await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ id_reference: reference.Id }) !== null;
  }

  static async fromId(id) {
    const equipment = await DatabasePool
      .getConnection()
      .collection('equipment')
      .findOne({ _id: id });

    return new Equipment(
      equipment._id,
      equipment.code,
      await Reference.fromId(equipment.id_reference),
      await Room.fromId(equipment.id_stockage_room),
      equipment.end_of_life_date,
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
      await Reference.fromId(equipment.id_reference),
      await Room.fromId(equipment.id_stockage_room),
      equipment.end_of_life_date,
    );
  }

  static async all() {
    const equipments = await DatabasePool
      .getConnection()
      .collection('equipment')
      .find()
      .toArray();

    const equipmentsPromises = equipments.map(
      async (equipment) => new Equipment(
        equipment._id,
        equipment.code,
        await Reference.fromId(equipment.id_reference),
        await Room.fromId(equipment.id_stockage_room),
        equipment.end_of_life_date,
      ),
    );

    return Promise.all(equipmentsPromises);
  }

  static async allOfReference(reference) {
    const equipments = await DatabasePool
      .getConnection()
      .collection('equipment')
      .find({ id_reference: reference.Id })
      .toArray();

    const equipmentsPromises = equipments.map(
      async (equipment) => new Equipment(
        equipment._id,
        equipment.code,
        reference,
        await Room.fromId(equipment.id_stockage_room),
        equipment.end_of_life_date,
      ),
    );

    return Promise.all(equipmentsPromises);
  }
}

export default Equipment;
