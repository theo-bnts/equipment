import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Organization from '../../../entities/Organization.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/organizations',
    [
      headerAuthorization(),
      authenticate,
      administrator,
    ],
    async (req, res) => {
      const organizations = await Organization.all();

      return res
        .send({
          datas: organizations.map((organization) => organization.format()),
        });
    },
  );
}
