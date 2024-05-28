import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/loans',
    [
      header_authorization,
      authentificate,
      administrator,
    ],
    async (req, res) => {
      const equipmentLoans = await EquipmentLoan.all();

      return res
        .send({
          datas: equipmentLoans.map(equipmentLoan => equipmentLoan.format()),
        });
    }
  );
}
