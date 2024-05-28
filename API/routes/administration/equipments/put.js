import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentReference from '../../../entities/EquipmentReference.js';
import { header_authorization, body_name, body_code } from '../../../middlewares/schemas.js';
import Room from '../../../entities/Room.js';

export default function route(app) {
  app.put(
    '/administration/equipments',
    [
      header_authorization,
      authentificate,
      administrator,
      body_code('equipment.'),
      body_name('equipment.reference.'),
      body_name('equipment.stockage_room.'),
    ],
    async (req, res) => {
      if (await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_ALREADY_EXISTS' }] });
      }

      if (!await EquipmentReference.nameExists(req.body.equipment.reference.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_REFERENCE_NAME_NOT_FOUND' }] });
      }

      if (!await Room.nameExists(req.body.equipment.stockage_room.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'ROOM_NAME_NOT_FOUND' }] });
      }

      const equipment = new Equipment(
        null,
        req.body.equipment.code,
        await EquipmentReference.fromName(req.body.equipment.reference.name),
        await Room.fromName(req.body.equipment.stockage_room.name),
      );

      await equipment.insert();

      return res
        .status(204)
        .send();
    },
  );
}
