import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import EquipmentType from '../../../entities/EquipmentType.js';
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
      if (await EquipmentType.nameExists(req.body.type.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_ALREADY_EXISTS' }] });
      }

      const equipmentType = new EquipmentType(
        null,
        req.body.type.name,
        req.body.type.organization_only,
      );

      await equipmentType.insert();

      return res
        .status(204)
        .send();
    },
  );
}
