import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Equipment from '../../../entities/Equipment.js';
import Reference from '../../../entities/Reference.js';
import { bodyName, headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/administration/references',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyName('reference.'),
    ],
    async (req, res) => {
      if (!await Reference.nameExists(req.body.reference.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_REFERENCE_NAME_NOT_FOUND' }] });
      }

      const reference = await Reference.fromName(req.body.reference.name);

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
