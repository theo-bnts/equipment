import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import RoleType from '../../../entities/RoleType.js';
import {
  bodyEmailAddress, bodyFirstName, bodyLastName, bodyName, bodyPassword, headerAuthorization,
} from '../../../middlewares/schemas.js';
import Security from '../../../entities/tools/Security.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.put(
    '/administration/accounts',
    [
      headerAuthorization(),
      authenticate,
      administrator,
      bodyEmailAddress('user.'),
      bodyPassword('user.'),
      bodyFirstName('user.'),
      bodyLastName('user.'),
      bodyName('user.role.'),
    ],
    async (req, res) => {
      if (await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_ALREADY_EXISTS' }] });
      }

      const passwordHashSalt = Security.generateSaltValue();
      const passwordHash = Security.hashPassword(req.body.user.password, passwordHashSalt);

      const user = new User(
        null,
        req.body.user.email_address,
        passwordHash,
        passwordHashSalt,
        req.body.user.first_name,
        req.body.user.last_name,
        await RoleType.fromName(req.body.user.role.name),
      );

      await user.insert();

      return res
        .status(204)
        .send();
    },
  );
}
