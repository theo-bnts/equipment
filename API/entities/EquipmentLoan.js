import DatabasePool from './tools/DatabasePool.js';
import Equipment from './Equipment.js';
import EquipmentLoanStateType from './EquipmentLoanStateType.js';
import Organization from './Organization.js';
import Room from './Room.js';
import User from './User.js';

class EquipmentLoan {
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

  format() {
    return {
      state: this.State.format(),
      loan_date: this.LoanDate,
      return_date: this.ReturnDate,
      user: this.User.format(),
      organization: this.Organization.format(),
      equipment: this.Equipment.format(),
      room: this.Room.format(),
    };
  }

  static async fromId(id) {
    const equipmentLoan = await DatabasePool
      .getConnection()
      .collection('equipment_loan')
      .findOne({ _id: id });

    return new EquipmentLoan(
      equipmentLoan._id,
      await EquipmentLoanStateType.fromId(equipmentLoan.id_state_type),
      equipmentLoan.loan_date,
      equipmentLoan.return_date,
      await User.fromId(equipmentLoan.id_user),
      await Organization.fromId(equipmentLoan.id_organization),
      await Equipment.fromId(equipmentLoan.id_equipment),
      await Room.fromId(equipmentLoan.id_loan_room),
    );
  }

  static async all() {
    const equipmentLoans = await DatabasePool
      .getConnection()
      .collection('equipment_loan')
      .find()
      .toArray();
    
    return Promise.all(equipmentLoans.map(async (equipmentLoan) => {
      return new EquipmentLoan(
        equipmentLoan._id,
        await EquipmentLoanStateType.fromId(equipmentLoan.id_state_type),
        equipmentLoan.loan_date,
        equipmentLoan.return_date,
        await User.fromId(equipmentLoan.id_user),
        await Organization.fromId(equipmentLoan.id_organization),
        await Equipment.fromId(equipmentLoan.id_equipment),
        await Room.fromId(equipmentLoan.id_loan_room),
      );
    }));
  }

  static async allOfUser(user) {
    const equipmentLoans = await DatabasePool
      .getConnection()
      .collection('equipment_loan')
      .find({ id_user: user.Id })
      .toArray();
    
    return Promise.all(equipmentLoans.map(async (equipmentLoan) => {
      return new EquipmentLoan(
        equipmentLoan._id,
        await EquipmentLoanStateType.fromId(equipmentLoan.id_state_type),
        equipmentLoan.loan_date,
        equipmentLoan.return_date,
        user,
        await Organization.fromId(equipmentLoan.id_organization),
        await Equipment.fromId(equipmentLoan.id_equipment),
        await Room.fromId(equipmentLoan.id_loan_room),
      );
    }));
  }
}

export default EquipmentLoan;