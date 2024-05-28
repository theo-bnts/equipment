import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import RoleType from '../../../entities/RoleType.js';
import { header_authorization, body_email_address, body_password, body_first_name, body_last_name, body_name } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';
import Security from '../../../entities/tools/Security.js';

export default function route(app) {
  app.put(
    '/administration/accounts',
    [
      header_authorization,
      authentificate,
      administrator,
      body_email_address('user.'),
      body_password('user.'),
      body_first_name('user.'),
      body_last_name('user.'),
      body_name('user.role.'),
    ],
    async (req, res) => {
      if (await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_ALREADY_USED' }] });
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
