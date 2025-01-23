import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Loan from '../../../entities/Loan.js';
import { bodyEmailAddress, headerAuthorization } from '../../../middlewares/schemas.js';
import Token from '../../../entities/Token.js';
import User from '../../../entities/User.js';
import UserOrganization from '../../../entities/UserOrganization.js';

export default function route(app) {
  app.delete(
    '/administration/accounts',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyEmailAddress('user.'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.user.email_address);

      if (user.Role.Name === 'ADMINISTRATOR') {
        return res
          .status(403)
          .send({ errors: [{ msg: 'ADMINISTRATOR_ACCOUNT' }] });
      }

      if (await UserOrganization.userExists(user)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_HAS_ORGANIZATION' }] });
      }

      if (await Loan.userExists(user)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_HAS_LOAN' }] });
      }

      const tokens = await Token.allOfUser(user);

      const tokensDeletionPromises = tokens.map(
        async (token) => token.delete(),
      );

      await Promise.all(tokensDeletionPromises);

      await user.delete();

      return res
        .status(204)
        .send();
    },
  );
}
