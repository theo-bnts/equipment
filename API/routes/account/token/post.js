import 'dotenv/config';

import { email_address, password } from '../../../middlewares/schemas.js';
import Security from '../../../entities/tools/Security.js';
import Token from '../../../entities/Token.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.post(
    '/account/token',
    [
      email_address,
      password,
    ],
    async (req, res) => {
      if (!await User.isEmailAddressInserted(req.body.email_address)) {
        return res
          .status(401)
          .send({ errors: [{ msg: 'EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.email_address);

      if (!user.isValidPassword(req.body.password)) {
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
