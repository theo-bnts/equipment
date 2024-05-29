import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import Type from '../../../entities/Type.js';
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
      const types = await Type.all();

      return res
        .send({
          datas: types.map(type => type.format()),
        });
    }
  );
}
