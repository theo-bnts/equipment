import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/equipments',
    [
      header_authorization,
      authentificate,
      administrator,
    ],
    async (req, res) => {
      const equipments = await Equipment.all();

      return res
        .send({
          datas: equipments.map(equipment => equipment.format()),
        });
    }
  );
}
