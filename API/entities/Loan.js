import DatabasePool from './tools/DatabasePool.js';
import Equipment from './Equipment.js';
import Organization from './Organization.js';
import Room from './Room.js';
import StateType from './StateType.js';
import User from './User.js';

class Loan {
  Id;

  State;

  LoanDate;

  ReturnDate;

  User;

  Organization;

  Equipment;

  Room;

  constructor(id, state, loanDate, returnDate, user, organization, equipment, room) {
    this.Id = id;
    this.State = state;
    this.LoanDate = loanDate;
    this.ReturnDate = returnDate;
    this.User = user;
    this.Organization = organization;
    this.Equipment = equipment;
    this.Room = room;
  }

  async isRunning() {
    const loanedStateType = await StateType.fromName('LOANED');

    return this.State.Id.equals(loanedStateType.Id);
  }

  async insert() {
    const loanData = {
      id_state_type: this.State.Id,
      loan_date: this.LoanDate,
      return_date: this.ReturnDate,
      id_user: this.User.Id,
      id_organization: this.Organization !== null ? this.Organization.Id : null,
      id_equipment: this.Equipment.Id,
      id_room: this.Room.Id,
    };

    return DatabasePool
      .getConnection()
      .collection('loan')
      .insertOne(loanData);
  }

  async update() {
    const loanData = {
      id_state_type: this.State.Id,
      loan_date: this.LoanDate,
      return_date: this.ReturnDate,
      id_user: this.User.Id,
      id_organization: this.Organization !== null ? this.Organization.Id : null,
      id_equipment: this.Equipment.Id,
      id_room: this.Room.Id,
    };

    return DatabasePool
      .getConnection()
      .collection('loan')
      .updateOne({ _id: this.Id }, { $set: loanData });
  }

  async delete() {
    return DatabasePool
      .getConnection()
      .collection('loan')
      .deleteOne({ _id: this.Id });
  }

  format() {
    return {
      state: this.State.format(),
      loan_date: this.LoanDate,
      return_date: this.ReturnDate,
      user: this.User.format(),
      organization: this.Organization !== null ? this.Organization.format() : null,
      equipment: this.Equipment.format(),
      room: this.Room.format(),
    };
  }

  static async userExists(user) {
    return await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_user: user.Id })
      .count() > 0;
  }

  static async equipmentExists(equipment) {
    return await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_equipment: equipment.Id })
      .count() > 0;
  }

  static async fromId(id) {
    const loan = await DatabasePool
      .getConnection()
      .collection('loan')
      .findOne({ _id: id });

    return new Loan(
      loan._id,
      await StateType.fromId(loan.id_state_type),
      loan.loan_date,
      loan.return_date,
      await User.fromId(loan.id_user),
      loan.id_organization !== null ? await Organization.fromId(loan.id_organization) : null,
      await Equipment.fromId(loan.id_equipment),
      await Room.fromId(loan.id_room),
    );
  }

  static async lastOfEquipment(equipment) {
    const loan = await DatabasePool
      .getConnection()
      .collection('loan')
      .findOne({ id_equipment: equipment.Id }, { sort: { loan_date: -1 } });

    return new Loan(
      loan._id,
      await StateType.fromId(loan.id_state_type),
      loan.loan_date,
      loan.return_date,
      await User.fromId(loan.id_user),
      loan.id_organization !== null ? await Organization.fromId(loan.id_organization) : null,
      await Equipment.fromId(loan.id_equipment),
      await Room.fromId(loan.id_room),
    );
  }

  static async all() {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find()
      .toArray();

    const loansPromises = loans.map(async (loan) => new Loan(
      loan._id,
      await StateType.fromId(loan.id_state_type),
      loan.loan_date,
      loan.return_date,
      await User.fromId(loan.id_user),
      loan.id_organization !== null ? await Organization.fromId(loan.id_organization) : null,
      await Equipment.fromId(loan.id_equipment),
      await Room.fromId(loan.id_room),
    ));

    return Promise.all(loansPromises);
  }

  static async allOfStateTypes(stateTypes) {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_state_type: { $in: stateTypes.map((stateType) => stateType.Id) } })
      .toArray();

    const loansPromises = loans.map(async (loan) => new Loan(
      loan._id,
      await StateType.fromId(loan.id_state_type),
      loan.loan_date,
      loan.return_date,
      await User.fromId(loan.id_user),
      loan.id_organization !== null ? await Organization.fromId(loan.id_organization) : null,
      await Equipment.fromId(loan.id_equipment),
      await Room.fromId(loan.id_room),
    ));

    return Promise.all(loansPromises);
  }

  static async allOfUser(user) {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_user: user.Id })
      .toArray();

    const loansPromises = loans.map(async (loan) => new Loan(
      loan._id,
      await StateType.fromId(loan.id_state_type),
      loan.loan_date,
      loan.return_date,
      user,
      loan.id_organization !== null ? await Organization.fromId(loan.id_organization) : null,
      await Equipment.fromId(loan.id_equipment),
      await Room.fromId(loan.id_room),
    ));

    return Promise.all(loansPromises);
  }

  static async allOfEquipment(equipment) {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_equipment: equipment.Id })
      .toArray();

    const loansPromises = loans.map(async (loan) => new Loan(
      loan._id,
      await StateType.fromId(loan.id_state_type),
      loan.loan_date,
      loan.return_date,
      await User.fromId(loan.id_user),
      loan.id_organization !== null ? await Organization.fromId(loan.id_organization) : null,
      equipment,
      await Room.fromId(loan.id_room),
    ));

    return Promise.all(loansPromises);
  }
}

export default Loan;
