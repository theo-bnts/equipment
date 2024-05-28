import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import { header_authorization, body_code, body_name } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/administration/loans',
    [
      header_authorization,
      authentificate,
      administrator,
      body_code('equipment.'),
    ],
    async (req, res) => {
      if (!await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_NOT_FOUND' }] });
      }

      const equipment = await Equipment.fromCode(req.body.equipment.code);

      if (!await EquipmentLoan.equipmentExists(equipment)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'NO_EQUIPMENT_LOAN' }] });
      }

      const loans = await EquipmentLoan.allOfEquipment(equipment);

      for (const loan of loans) {
        await loan.delete();
      }

      return res
        .status(204)
        .send();
    }
  );
}
