import 'dotenv/config';

import { authentificate } from '../../../../middlewares/authentificate.js';
import Equipment from '../../../../entities/Equipment.js';
import EquipmentLoan from '../../../../entities/EquipmentLoan.js';
import EquipmentLoanStateType from '../../../../entities/EquipmentLoanStateType.js';
import Organization from '../../../../entities/Organization.js';
import Room from '../../../../entities/Room.js';
import { header_authorization, body_code, body_name } from '../../../../middlewares/schemas.js';
import UserOrganization from '../../../../entities/UserOrganization.js';

export default function route(app) {
  app.post(
    '/user/equipments/return',
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

      equipmentLoan.State = await EquipmentLoanStateType.fromName('Retour demandé');

      await equipmentLoan.update();

      return res
        .status(204)
        .send();
    }
  );
}
