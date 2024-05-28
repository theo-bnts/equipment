import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import { header_authorization, body_email_address } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.delete(
    '/administration/accounts',
    [
      header_authorization,
      authentificate,
      administrator,
      body_email_address('user.'),
    ],
    async (req, res) => {
      if (!await User.emailAddressExists(req.body.user.email_address)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'USER_EMAIL_ADDRESS_NOT_FOUND' }] });
      }

      const user = await User.fromEmailAddress(req.body.user.email_address);

      if (user.Role.Name === 'ADMINISTRATOR') {
        return res
          .status(403)
          .send({ errors: [{ msg: 'ADMINISTRATOR_ACCOUNT' }] });
      }

      await user.delete();

      return res
        .status(204)
        .send();
    },
  );
}
