import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import EquipmentLoanStateType from '../../../entities/EquipmentLoanStateType.js';
import { header_authorization, body_code, body_name } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.patch(
    '/administration/loans',
    [
      header_authorization,
      authentificate,
      administrator,
      body_code('equipment.'),
      body_name('loan.state.'),
    ],
    async (req, res) => {
      if (!await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_NOT_FOUND' }] });
      }

      if (!await EquipmentLoanStateType.nameExists(req.body.loan.state.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_LOAN_CODE_NOT_FOUND' }] });
      }

      const equipment = await Equipment.fromCode(req.body.equipment.code);

      const equipmentLoan = await EquipmentLoan.fromEquipment(equipment);

      if (
        equipmentLoan.State.Name === 'Demandé' && (req.body.loan.state.name !== 'Emprunté' && req.body.loan.state.name !== 'Refusé')
        || (equipmentLoan.State.Name === 'Emprunté' && req.body.loan.state.name !== 'Retour demandé')
        || (equipmentLoan.State.Name === 'Retour demandé' && req.body.loan.state.name !== 'Retourné')
      ) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_LOAN_STATE_NOT_ALLOWED' }] });
      }

      equipmentLoan.State = await EquipmentLoanStateType.fromName(req.body.loan.state.name);

      await equipmentLoan.update();

      return res
        .status(204)
        .send();
    }
  );
}
