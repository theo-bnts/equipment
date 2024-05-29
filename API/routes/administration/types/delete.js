import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Reference from '../../../entities/Reference.js';
import { bodyName, headerAuthorization } from '../../../middlewares/schemas.js';
import Type from '../../../entities/Type.js';

export default function route(app) {
  app.delete(
    '/administration/types',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyName('type.'),
    ],
    async (req, res) => {
      if (!await Type.nameExists(req.body.type.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_NOT_FOUND' }] });
      }

      const type = await Type.fromName(req.body.type.name);

      if (await Reference.typeExists(type)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_TYPE_USED' }] });
      }

      await type.delete();

      return res
        .status(204)
        .send();
    },
  );
}
