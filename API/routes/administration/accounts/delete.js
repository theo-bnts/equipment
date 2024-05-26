import 'dotenv/config';

import { authentificate, administrator } from '../../../middlewares/authentificate.js';
import { authorization, email_address } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.delete(
    '/administration/accounts',
    [
      authorization,
      authentificate,
      administrator,
      email_address,
    ],
    async (req, res) => {
      if (!await User.isEmailAddressInserted(req.body.email_address)) {
        return res
          .status(404)
          .send({ errors: { msg: 'EMAIL_ADDRESS_NOT_FOUND' } });
      }

      const user = await User.fromEmailAddress(req.body.email_address);

      if (user.Role.isAdministrator()) {
        return res
          .status(403)
          .send({ errors: { msg: 'ADMINISTRATOR_ACCOUNT' } });
      }

      await user.delete();

      return res
        .status(204)
        .send();
    },
  );
}
