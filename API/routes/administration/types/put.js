import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import { bodyName, bodyOrganizationOnly, headerAuthorization } from '../../../middlewares/schemas.js';
import Type from '../../../entities/Type.js';

export default function route(app) {
  app.put(
    '/administration/types',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyName('type.'),
      bodyOrganizationOnly('type.'),
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
