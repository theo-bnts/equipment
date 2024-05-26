import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import RoleType from '../../../entities/RoleType.js';
import { authorization, email_address, password, first_name, last_name, role } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';
import Security from '../../../entities/tools/Security.js';

export default function route(app) {
  app.post(
    '/administration/accounts',
    [
      authorization,
      authentificate,
      administrator,
      email_address,
      password,
      first_name,
      last_name,
      role,
    ],
    async (req, res) => {
      if (await User.isEmailAddressInserted(req.body.email_address)) {
        return res
          .status(409)
          .send({ errors: { msg: 'EMAIL_ADDRESS_ALREADY_USED' } });
      }

      const passwordHashSalt = Security.generateSaltValue();
      const passwordHash = Security.hashPassword(req.body.password, passwordHashSalt);

      const user = new User(
        null,
        req.body.email_address,
        passwordHash,
        passwordHashSalt,
        req.body.first_name,
        req.body.last_name,
        await RoleType.fromName(req.body.role.name),
      );

      await user.insert();

      return res
        .status(204)
        .send();
    },
  );
}
