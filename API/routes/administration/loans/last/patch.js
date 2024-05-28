import 'dotenv/config';

import { administrator, authentificate } from '../../../../middlewares/authentificate.js';
import Equipment from '../../../../entities/Equipment.js';
import EquipmentLoan from '../../../../entities/EquipmentLoan.js';
import EquipmentLoanStateType from '../../../../entities/EquipmentLoanStateType.js';
import { header_authorization, body_code, body_name } from '../../../../middlewares/schemas.js';

export default function route(app) {
  app.patch(
    '/administration/loans/last',
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

      const equipmentLoan = await EquipmentLoan.lastOfEquipment(equipment);

      if (
        equipmentLoan.State.Name === 'REQUESTED' && (req.body.loan.state.name !== 'LOANED' && req.body.loan.state.name !== 'REFUSED')
        || (equipmentLoan.State.Name === 'LOANED' && req.body.loan.state.name !== 'RETURN_REQUESTED')
        || (equipmentLoan.State.Name === 'RETURN_REQUESTED' && req.body.loan.state.name !== 'RETURNED')
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
