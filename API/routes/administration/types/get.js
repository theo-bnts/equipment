import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import EquipmentType from '../../../entities/EquipmentType.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/types',
    [
      header_authorization,
      authentificate,
      administrator,
    ],
    async (req, res) => {
      const types = await EquipmentType.all();

      return res
        .send({
          datas: types.map(type => type.format()),
        });
    }
  );
}
