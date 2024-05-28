import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import { header_authorization } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.get(
    '/administration/accounts',
    [
      header_authorization,
      authentificate,
      administrator,
    ],
    async (req, res) => {
      const users = await User.all();

      return res
        .send({
          datas: users.map(user => user.format()),
        });
    }
  );
}
