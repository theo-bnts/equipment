import { administrator, authenticate } from '../../../../middlewares/authenticate.js';
import Organization from '../../../../entities/Organization.js';
import { bodyEmailAddress, bodyName, headerAuthorization } from '../../../../middlewares/schemas.js';
import User from '../../../../entities/User.js';
import UserOrganization from '../../../../entities/UserOrganization.js';

export default function route(app) {
  app.delete(
    '/administration/users/organizations',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyEmailAddress('user.'),
      bodyName('organization.'),
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

      if (!await UserOrganization.userAndOrganizationExists(user, organization)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_NOT_IN_ORGANIZATION' }] });
      }

      const userOrganization = await UserOrganization.fromUserAndOrganization(user, organization);

      await userOrganization.delete();

      return res
        .status(204)
        .send();
    },
  );
}
