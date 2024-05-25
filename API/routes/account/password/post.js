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
      const { email_address: emailAddress, old_password: oldPassword, password } = req.body;

      if (!await User.isEmailAddressInserted(emailAddress)) {
        return res
          .status(401)
          .send({ errors: [{ type: 'EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(emailAddress);

      if (!user.isValidPassword(oldPassword)) {
        return res
          .status(403)
          .send({ errors: [{ type: 'INVALID_OLD_PASSWORD' }] });
      }

      if (Security.hashPassword(password, user.PasswordHashSalt) === user.PasswordHash) {
        return res
          .status(403)
          .send({ errors: [{ type: 'SAME_PASSWORD' }] });
      }

      user.PasswordHashSalt = Security.generateSaltValue();
      user.PasswordHash = Security.hashPassword(password, user.PasswordHashSalt);

      await user.update();

      return res
        .status(204)
        .send();
    }
  );
}
