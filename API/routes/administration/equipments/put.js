import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Equipment from '../../../entities/Equipment.js';
import Reference from '../../../entities/Reference.js';
import Room from '../../../entities/Room.js';
import {
  bodyCode, bodyEndOfLifeDate, bodyName, headerAuthorization,
} from '../../../middlewares/schemas.js';

export default function route(app) {
  app.put(
    '/administration/equipments',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyCode('equipment.'),
      bodyName('equipment.reference.'),
      bodyName('equipment.stockage_room.'),
      bodyEndOfLifeDate('equipment.'),
    ],
    async (req, res) => {
      if (await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_ALREADY_EXISTS' }] });
      }

      if (!await Reference.nameExists(req.body.equipment.reference.name)) {
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
        await Reference.fromName(req.body.equipment.reference.name),
        await Room.fromName(req.body.equipment.stockage_room.name),
        new Date(req.body.equipment.end_of_life),
      );

      await equipment.insert();

      return res
        .status(204)
        .send();
    },
  );
}
