import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import RoleType from '../../../entities/RoleType.js';
import { authorization, email_address, password, first_name, last_name, name } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';
import Security from '../../../entities/tools/Security.js';

export default function route(app) {
  app.post(
    '/administration/accounts',
    [
      authorization,
      authentificate,
      administrator,
      email_address('user.'),
      password('user.'),
      first_name('user.'),
      last_name('user.'),
      name('user.role.'),
    ],
    async (req, res) => {
      if (await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(409)
          .send({ errors: { msg: 'USER_EMAIL_ADDRESS_ALREADY_USED' } });
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
