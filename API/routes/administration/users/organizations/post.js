import 'dotenv/config';

import { authentificate, administrator } from '../../../../middlewares/authentificate.js';
import Organization from '../../../../entities/Organization.js';
import { authorization, email_address, name } from '../../../../middlewares/schemas.js';
import User from '../../../../entities/User.js';
import UserOrganization from '../../../../entities/UserOrganization.js';

export default function route(app) {
  app.post(
    '/administration/users/organizations',
    [
      authorization,
      authentificate,
      administrator,
      email_address('user.'),
      name('organization.'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(404)
          .send({ errors: { msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' } });
      }

      if (!await Organization.nameExists(req.body.organization.name)) {
        return res
          .status(404)
          .send({ errors: { msg: 'ORGANIZATION_NAME_NOT_FOUND' } });
      }

      const user = await User.fromEmailAddress(req.body.user.email_address);

      const organization = await Organization.fromName(req.body.organization.name);

      if (await UserOrganization.exists(user, organization)) {
        return res
          .status(409)
          .send({ errors: { msg: 'USER_ORGANIZATION_ALREADY_EXISTS' } });
      }

      const userOrganization = new UserOrganization(
        null,
        user,
        organization,
      );

      await userOrganization.insert();

      return res
        .status(204)
        .send();
    },
  );
}
