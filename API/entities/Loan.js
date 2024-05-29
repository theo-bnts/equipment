import DatabasePool from './tools/DatabasePool.js';
import Equipment from './Equipment.js';
import StateType from './StateType.js';
import Organization from './Organization.js';
import Room from './Room.js';
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

    return this.State.Id === loanedStateType.Id;
  }

  async insert() {
    const loanData = {
      id_state_type: this.State.Id,
      loan_date: this.LoanDate,
      return_date: this.ReturnDate,
      id_user: this.User.Id,
      id_equipment: this.Equipment.Id,
      id_room: this.Room.Id,
    };

    if (this.Organization) {
      loanData.id_organization = this.Organization.Id;
    }

    return await DatabasePool
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
      id_equipment: this.Equipment.Id,
      id_room: this.Room.Id,
    };

    if (this.Organization) {
      loanData.id_organization = this.Organization.Id;
    }

    return await DatabasePool
      .getConnection()
      .collection('loan')
      .updateOne({ _id: this.Id }, { $set: loanData });
  }

  async delete() {
    return await DatabasePool
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
      organization: this.Organization?.format(),
      equipment: this.Equipment.format(),
      room: this.Room.format(),
    };
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
      await Organization.fromId(loan.id_organization),
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
      await Organization.fromId(loan.id_organization),
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

    return Promise.all(loans.map(async (loan) => {
      return new Loan(
        loan._id,
        await StateType.fromId(loan.id_state_type),
        loan.loan_date,
        loan.return_date,
        await User.fromId(loan.id_user),
        await Organization.fromId(loan.id_organization),
        await Equipment.fromId(loan.id_equipment),
        await Room.fromId(loan.id_room),
      );
    }));
  }

  static async allOfStateTypes(stateTypes) {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_state_type: { $in: stateTypes.map((stateType) => stateType.Id) } })
      .toArray();

    return Promise.all(loans.map(async (loan) => {
      return new Loan(
        loan._id,
        await StateType.fromId(loan.id_state_type),
        loan.loan_date,
        loan.return_date,
        await User.fromId(loan.id_user),
        await Organization.fromId(loan.id_organization),
        await Equipment.fromId(loan.id_equipment),
        await Room.fromId(loan.id_room),
      );
    }));
  }

  static async allOfUser(user) {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_user: user.Id })
      .toArray();

    return Promise.all(loans.map(async (loan) => {
      return new Loan(
        loan._id,
        await StateType.fromId(loan.id_state_type),
        loan.loan_date,
        loan.return_date,
        user,
        await Organization.fromId(loan.id_organization),
        await Equipment.fromId(loan.id_equipment),
        await Room.fromId(loan.id_room),
      );
    }));
  }

  static async allOfEquipment(equipment) {
    const loans = await DatabasePool
      .getConnection()
      .collection('loan')
      .find({ id_equipment: equipment.Id })
      .toArray();

    return Promise.all(loans.map(async (loan) => {
      return new Loan(
        loan._id,
        await StateType.fromId(loan.id_state_type),
        loan.loan_date,
        loan.return_date,
        await User.fromId(loan.id_user),
        await Organization.fromId(loan.id_organization),
        equipment,
        await Room.fromId(loan.id_room),
      );
    }));
  }
}

export default Loan;
