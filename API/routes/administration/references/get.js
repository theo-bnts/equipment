import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import Reference from '../../../entities/Reference.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/references',
    [
      header_authorization,
      authentificate,
      administrator,
    ],
    async (req, res) => {
      const references = await Reference.all();

      return res
        .send({
          datas: references.map(reference => reference.format()),
        });
    }
  );
}
