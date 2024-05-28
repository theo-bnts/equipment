import 'dotenv/config';

import { authentificate, administrator } from '../../../../middlewares/authentificate.js';
import Organization from '../../../../entities/Organization.js';
import { header_authorization, body_email_address, body_name } from '../../../../middlewares/schemas.js';
import User from '../../../../entities/User.js';
import UserOrganization from '../../../../entities/UserOrganization.js';

export default function route(app) {
  app.put(
    '/administration/users/organizations',
    [
      header_authorization,
      authentificate,
      administrator,
      body_email_address('user.'),
      body_name('organization.'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      if (!await Organization.nameExists(req.body.organization.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'ORGANIZATION_NAME_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.user.email_address);

      const organization = await Organization.fromName(req.body.organization.name);

      if (await UserOrganization.exists(user, organization)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_IS_ALREADY_IN_ORGANIZATION' }] });
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
