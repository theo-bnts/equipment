import 'dotenv/config';

import { body_email_address, body_password } from '../../../middlewares/schemas.js';
import Security from '../../../entities/tools/Security.js';
import Token from '../../../entities/Token.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.post(
    '/account/token',
    [
      body_email_address('user.'),
      body_password('user.'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(401)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.user.email_address);

      if (!user.isValidPassword(req.body.user.password)) {
        return res
          .status(403)
          .send({ errors: [{ msg: 'INVALID_PASSWORD' }] });
      }

      const token = new Token(
        null,
        Security.generateTokenValue(),
        new Date(Date.now() + parseInt(process.env.TOKEN_EXPIRATION_SECONDS, 10) * 1000),
        user,
      );

      await token.insert();

      return res
        .send({
          datas: token.format(),
        });
    }
  );
}
