import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import EquipmentLoanStateType from '../../../entities/EquipmentLoanStateType.js';
import { header_authorization, body_code, body_name } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.patch(
    '/user/loans',
    [
      header_authorization,
      authentificate,
      body_code('equipment.'),
    ],
    async (req, res) => {
      if (!await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_NOT_FOUND' }] });
      }

      const equipment = await Equipment.fromCode(req.body.equipment.code);

      const equipmentLoan = await EquipmentLoan.fromEquipment(equipment);

      if (!await equipmentLoan.isRunning()) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_LOAN_NOT_RUNNING' }] });
      }

      equipmentLoan.State = await EquipmentLoanStateType.fromName('RETURN_REQUESTED');

      await equipmentLoan.update();

      return res
        .status(204)
        .send();
    }
  );
}
