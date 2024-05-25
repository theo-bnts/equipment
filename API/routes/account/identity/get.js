import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import { authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/account/identity',
    [
      authorization,
      authentificate,
    ],
    async (req, res) => {
      const formattedUser = {
        email_address: req.token.User.EmailAddress,
        first_name: req.token.User.FirstName,
        last_name: req.token.User.LastName,
        role: {
          name: req.token.User.Role.Name,
        },
      };

      return res
        .send({
          datas: formattedUser,
        });
    },
  );
}
