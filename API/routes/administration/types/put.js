import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import Type from '../../../entities/Type.js';
import { header_authorization, body_name, body_organization_only } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.put(
    '/administration/types',
    [
      header_authorization,
      authentificate,
      administrator,
      body_name('type.'),
      body_organization_only('type.'),
    ],
    async (req, res) => {
      if (await Type.nameExists(req.body.type.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_ALREADY_EXISTS' }] });
      }

      const type = new Type(
        null,
        req.body.type.name,
        req.body.type.organization_only,
      );

      await type.insert();

      return res
        .status(204)
        .send();
    },
  );
}
