import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import { header_authorization, body_code } from '../../../middlewares/schemas.js';
import Loan from '../../../entities/Loan.js';

export default function route(app) {
  app.delete(
    '/administration/equipments',
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

      if (await Loan.equipmentExists(equipment)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_USED' }] });
      }

      await equipment.delete();

      return res
        .status(204)
        .send();
    },
  );
}
