import 'dotenv/config';

import { authentificate } from '../../middlewares/authentificate.js';
import { authorization } from '../../middlewares/schemas.js';
import UserOrganization from '../../entities/UserOrganization.js';

export default function route(app) {
  app.get(
    '/organizations',
    [
      authorization,
      authentificate,
    ],
    async (req, res) => {
      const userOrganizations = await UserOrganization.all(req.token.User);

      const formattedUserOrganizations = userOrganizations.map(userOrganization => ({
        name: userOrganization.Organization.Name,
      }));

      return res
        .send({
          datas: formattedUserOrganizations,
        });
    }
  );
}
