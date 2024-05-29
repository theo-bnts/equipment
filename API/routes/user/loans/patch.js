import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import Loan from '../../../entities/Loan.js';
import StateType from '../../../entities/StateType.js';
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

      const loan = await Loan.lastOfEquipment(equipment);

      if (!await loan.isRunning()) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_LOAN_NOT_RUNNING' }] });
      }

      loan.State = await StateType.fromName('RETURN_REQUESTED');

      await loan.update();

      return res
        .status(204)
        .send();
    }
  );
}
