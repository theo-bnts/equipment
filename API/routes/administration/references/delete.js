import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentReference from '../../../entities/EquipmentReference.js';
import { header_authorization, body_name } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/administration/references',
    [
      header_authorization,
      authentificate,
      administrator,
      body_name('reference.'),
    ],
    async (req, res) => {
      if (!await EquipmentReference.nameExists(req.body.reference.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_REFERENCE_NAME_NOT_FOUND' }] });
      }

      const reference = await EquipmentReference.fromName(req.body.reference.name);

      if (await Equipment.referenceExists(reference)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_REFERENCE_USED' }] });
      }

      await reference.delete();

      return res
        .status(204)
        .send();
    },
  );
}
