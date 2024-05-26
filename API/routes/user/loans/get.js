import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import { authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/user/loans',
    [
      authorization,
      authentificate,
    ],
    async (req, res) => {
      const equipmentLoans = await EquipmentLoan.allOfUser(req.token.User);

      return res
        .send({
          datas: equipmentLoans.map(equipmentLoan => equipmentLoan.format()),
        });
    }
  );
}
