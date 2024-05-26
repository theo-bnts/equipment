import 'dotenv/config';

import { email_address, old_password, password } from '../../../middlewares/schemas.js';
import Security from '../../../entities/tools/Security.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.post(
    '/account/password',
    [
      email_address,
      old_password,
      password,
    ],
    async (req, res) => {
      if (!await User.isEmailAddressInserted(req.body.email_address)) {
        return res
          .status(401)
          .send({ errors: [{ msg: 'EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.email_address);

      if (!user.isValidPassword(req.body.old_password)) {
        return res
          .status(403)
          .send({ errors: [{ msg: 'INVALID_OLD_PASSWORD' }] });
      }

      if (Security.hashPassword(req.body.password, user.PasswordHashSalt) === user.PasswordHash) {
        return res
          .status(403)
          .send({ errors: [{ msg: 'SAME_PASSWORD' }] });
      }

      user.PasswordHashSalt = Security.generateSaltValue();
      user.PasswordHash = Security.hashPassword(req.body.password, user.PasswordHashSalt);

      await user.update();

      return res
        .status(204)
        .send();
    }
  );
}
