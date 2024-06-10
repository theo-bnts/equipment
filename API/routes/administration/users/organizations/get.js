import { administrator, authenticate } from '../../../../middlewares/authenticate.js';
import { headerAuthorization, queryEmailAddress } from '../../../../middlewares/schemas.js';
import User from '../../../../entities/User.js';
import UserOrganization from '../../../../entities/UserOrganization.js';

export default function route(app) {
  app.get(
    '/administration/users/organizations',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      queryEmailAddress('user_'),
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

      const userOrganizations = await UserOrganization.allOfUser(user);

      return res
        .send({
          datas: userOrganizations.map(
            (userOrganization) => userOrganization.Organization.format(),
          ),
        });
    },
  );
}
