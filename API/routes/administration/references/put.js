import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import Reference from '../../../entities/Reference.js';
import Type from '../../../entities/Type.js';
import { header_authorization, body_name } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.put(
    '/administration/references',
    [
      header_authorization,
      authentificate,
      administrator,
      body_name('reference.'),
      body_name('reference.type.'),
    ],
    async (req, res) => {
      if (await Reference.nameExists(req.body.reference.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_REFERENCE_NAME_ALREADY_EXISTS' }] });
      }

      if (!await Type.nameExists(req.body.reference.type.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_NOT_FOUND' }] });
      }

      const reference = new Reference(
        null,
        req.body.reference.name,
        await Type.fromName(req.body.reference.type.name),
      );

      await reference.insert();

      return res
        .status(204)
        .send();
    },
  );
}
