import 'dotenv/config';

import { authentificate, administrator } from '../../../../middlewares/authentificate.js';
import { header_authorization, query_email_address } from '../../../../middlewares/schemas.js';
import User from '../../../../entities/User.js';
import UserOrganization from '../../../../entities/UserOrganization.js';

export default function route(app) {
  app.get(
    '/administration/users/organizations',
    [
      header_authorization,
      authentificate,
      administrator,
      query_email_address('user_'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.query.user_email_address)) {
        return res
          .status(409)
          .send({
            errors: [{ msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' }],
          });
      }

      const user = await User.fromEmailAddress(req.query.user_email_address);

      const userOrganizations = await UserOrganization.all(user);

      return res
        .send({
          datas: userOrganizations.map(userOrganization => userOrganization.Organization.format()),
        });
    }
  );
}
