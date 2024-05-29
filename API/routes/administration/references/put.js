import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Reference from '../../../entities/Reference.js';
import { bodyName, headerAuthorization } from '../../../middlewares/schemas.js';
import Type from '../../../entities/Type.js';

export default function route(app) {
  app.put(
    '/administration/references',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyName('reference.'),
      bodyName('reference.type.'),
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
