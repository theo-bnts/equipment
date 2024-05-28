import DatabasePool from './tools/DatabasePool.js';

class Room {
  Id;

  Name;

  constructor(id, name) {
    this.Id = id;
    this.Name = name;
  }

  format() {
    return {
      name: this.Name,
    };
  }

  static async nameExists(name) {
    return await DatabasePool
      .getConnection()
      .collection('room')
      .findOne({ name }) !== null;
  }

  static async fromId(id) {
    const room = await DatabasePool
      .getConnection()
      .collection('room')
      .findOne({ _id: id });

    return new Room(room._id, room.name);
  }

  static async fromName(name) {
    const room = await DatabasePool
      .getConnection()
      .collection('room')
      .findOne({ name });
    
    return new Room(room._id, room.name);
  }

  static async all() {
    const rooms = await DatabasePool
      .getConnection()
      .collection('room')
      .find()
      .toArray();
    
    return rooms.map((room) => {
      return new Room(room._id, room.name);
    });
  }
}

export default Room;
