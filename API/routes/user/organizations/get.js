import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import { header_authorization } from '../../../middlewares/schemas.js';
import UserOrganization from '../../../entities/UserOrganization.js';

export default function route(app) {
  app.get(
    '/user/organizations',
    [
      header_authorization,
      authentificate,
    ],
    async (req, res) => {
      const userOrganizations = await UserOrganization.all(req.token.User);

      return res
        .send({
          datas: userOrganizations.map(userOrganization => userOrganization.Organization.format()),
        });
    }
  );
}
