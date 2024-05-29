import { authenticate } from '../../../middlewares/authenticate.js';
import Equipment from '../../../entities/Equipment.js';
import Loan from '../../../entities/Loan.js';
import { bodyCode, headerAuthorization } from '../../../middlewares/schemas.js';
import StateType from '../../../entities/StateType.js';

export default function route(app) {
  app.patch(
    '/user/loans',
    [
      headerAuthorization(),
      authenticate,
      bodyCode('equipment.'),
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
    },
  );
}
