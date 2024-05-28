import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import EquipmentReference from '../../../entities/EquipmentReference.js';
import EquipmentType from '../../../entities/EquipmentType.js';
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
      if (await EquipmentReference.nameExists(req.body.reference.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_REFERENCE_NAME_ALREADY_EXISTS' }] });
      }

      if (!await EquipmentType.nameExists(req.body.reference.type.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_NOT_FOUND' }] });
      }

      const reference = new EquipmentReference(
        null,
        req.body.reference.name,
        await EquipmentType.fromName(req.body.reference.type.name),
      );

      await reference.insert();

      return res
        .status(204)
        .send();
    },
  );
}
