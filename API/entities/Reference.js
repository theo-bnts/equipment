import DatabasePool from './tools/DatabasePool.js';
import Type from './Type.js';

class Reference {
  Id;

  Name;

  Type;

  constructor(id, name, type) {
    this.Id = id;
    this.Name = name;
    this.Type = type;
  }

  async insert() {
    await DatabasePool
      .getConnection()
      .collection('reference')
      .insertOne({
        name: this.Name,
        id_type: this.Type.Id,
      });
  }

  async delete() {
    await DatabasePool
      .getConnection()
      .collection('reference')
      .deleteOne({ _id: this.Id });
  }

  format() {
    return {
      name: this.Name,
      type: this.Type.format(),
    };
  }

  static async nameExists(name) {
    return await DatabasePool
      .getConnection()
      .collection('reference')
      .findOne({ name }) !== null;
  }

  static async typeExists(type) {
    return await DatabasePool
      .getConnection()
      .collection('reference')
      .findOne({ id_type: type.Id }) !== null;
  }

  static async fromId(id) {
    const reference = await DatabasePool
      .getConnection()
      .collection('reference')
      .findOne({ _id: id });

    return new Reference(
      reference._id,
      reference.name,
      await Type.fromId(reference.id_type),
    );
  }

  static async fromName(name) {
    const reference = await DatabasePool
      .getConnection()
      .collection('reference')
      .findOne({ name });

    return new Reference(
      reference._id,
      reference.name,
      await Type.fromId(reference.id_type),
    );
  }

  static async all() {
    const references = await DatabasePool
      .getConnection()
      .collection('reference')
      .find()
      .toArray();

    const referencesPromises = references.map(async (reference) => new Reference(
      reference._id,
      reference.name,
      await Type.fromId(reference.id_type),
    ));

    return Promise.all(referencesPromises);
  }

  static async allOfType(type) {
    const references = await DatabasePool
      .getConnection()
      .collection('reference')
      .find({ id_type: type.Id })
      .toArray();

    return references.map((reference) => new Reference(
      reference._id,
      reference.name,
      type,
    ));
  }
}

export default Reference;
