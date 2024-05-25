import 'dotenv/config';

import { body, validationResult } from 'express-validator';

import Security from '../../../../entities/tools/Security.js';
import Token from '../../../../entities/Token.js';
import User from '../../../../entities/User.js';

export default function route(app) {
  app.post(
    '/account/security/token',
    [
      body('email_address')
        .isEmail()
        .withMessage('Email address must be valid')
        .isLength({ max: parseInt(process.env.USER_EMAIL_ADDRESS_MAX_LENGTH, 10) })
        .withMessage(`Email address must be at most ${process.env.USER_EMAIL_ADDRESS_MAX_LENGTH} characters`),
      body('password')
        .isLength({ min: parseInt(process.env.USER_PASSWORD_MIN_LENGTH, 10) })
        .withMessage(`Password must be at least ${process.env.USER_PASSWORD_MIN_LENGTH} characters`),
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ errors: errors.array() });
      }

      const { email_address: emailAddress, password } = req.body;

      try {
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
      } catch (error) {
        next(error);
      }
    }
  );
}
