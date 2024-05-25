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
      const { email_address: emailAddress, password } = req.body;

      if (!await User.isEmailAddressInserted(emailAddress)) {
        return res
          .status(401)
          .send({ errors: [{ type: 'EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(emailAddress);

      if (!user.isValidPassword(password)) {
        return res
          .status(403)
          .send({ errors: [{ type: 'INVALID_PASSWORD' }] });
      }

      const token = new Token(
        null,
        Security.generateTokenValue(),
        new Date(Date.now() + parseInt(process.env.TOKEN_EXPIRATION_SECONDS, 10) * 1000),
        user,
      );

      await token.insert();

      const formattedToken = {
        value: token.Value,
        expiration: token.Expiration,
      };

      return res
        .send({
          datas: formattedToken,
        });
    }
  );
}
