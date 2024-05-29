import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Equipment from '../../../entities/Equipment.js';
import Loan from '../../../entities/Loan.js';
import { bodyCode, headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/administration/loans',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyCode('equipment.'),
    ],
    async (req, res) => {
      if (!await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_NOT_FOUND' }] });
      }

      const equipment = await Equipment.fromCode(req.body.equipment.code);

      if (!await Loan.equipmentExists(equipment)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'NO_EQUIPMENT_LOAN' }] });
      }

      const loans = await Loan.allOfEquipment(equipment);

      const deletePromises = loans.map((loan) => loan.delete());

      await Promise.all(deletePromises);

      return res
        .status(204)
        .send();
    },
  );
}
