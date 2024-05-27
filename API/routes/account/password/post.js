import 'dotenv/config';

import { body_email_address, body_old_password, body_password } from '../../../middlewares/schemas.js';
import Security from '../../../entities/tools/Security.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.post(
    '/account/password',
    [
      body_email_address('user.'),
      body_old_password('user.'),
      body_password('user.'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(401)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.user.email_address);

      if (!user.isValidPassword(req.body.user.old_password)) {
        return res
          .status(403)
          .send({ errors: [{ msg: 'INVALID_OLD_PASSWORD' }] });
      }

      if (Security.hashPassword(req.body.user.password, user.PasswordHashSalt) === user.PasswordHash) {
        return res
          .status(403)
          .send({ errors: [{ msg: 'SAME_PASSWORD' }] });
      }

      user.PasswordHashSalt = Security.generateSaltValue();
      user.PasswordHash = Security.hashPassword(req.body.user.password, user.PasswordHashSalt);

      await user.update();

      return res
        .status(204)
        .send();
    }
  );
}
